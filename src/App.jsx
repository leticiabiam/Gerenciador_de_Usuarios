import React, { useEffect, useMemo, useState } from 'react';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';

// ---------- Simple CSS (you can extract to src/styles.css) ----------
const styles = `
:root{ --bg:#f6f8fa; --card:#fff; --muted:#667; --accent:#0366d6; --danger:#d93636 }
[data-theme='dark']{
  --bg:#0f1720;
  --card:#0b1220;
  --muted:#ccc;         /* textos secundários mais claros */
  --accent:#58a6ff;
  --danger:#ff6b6b;
  color:#fff;           /* deixa todos os textos brancos */
}
*{box-sizing:border-box}
body{margin:0;font-family:Inter, ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial}
.app{min-height:100vh;background:var(--bg);padding:24px}
.container{max-width:1100px;margin:0 auto}
.header{display:flex;justify-content:space-between;align-items:center;margin-bottom:18px}
.card{background:var(--card);padding:16px;border-radius:12px;box-shadow:0 6px 18px rgba(10,10,10,0.06);}
.controls{display:flex;gap:8px;flex-wrap:wrap}
.input, .select{padding:8px 10px;border:1px solid #e6e9ee;border-radius:8px}
.btn{background:var(--accent);color:#fff;padding:8px 12px;border-radius:8px;border:none;cursor:pointer}
.btn.ghost{background:transparent;color:var(--accent);border:1px solid rgba(3,102,214,0.12)}
.table{width:100%;border-collapse:collapse;margin-top:12px}
.table th, .table td{padding:10px;border-bottom:1px solid #eee;text-align:left}
.row-actions{display:flex;gap:6px}
.small{font-size:13px;color:var(--muted)}
.form-grid{display:grid;grid-template-columns:1fr 1fr;gap:8px}
.full{grid-column:1/3}
.pagination{display:flex;gap:6px;align-items:center}
.badge{padding:4px 8px;border-radius:999px;background:#eef3ff;color:var(--accent);font-weight:600}
.status-active{color:green;font-weight:600}
.status-inactive{color:orange;font-weight:600}
.report{margin-top:12px}
`;

// ---------- Utilities ----------
const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2,8);

// Mock storage key
const STORAGE_KEY = 'desafio_users_v1';

// Basic mock backend (localStorage) with same interface as a real API
const mockApi = {
  async list() {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  },
  async create(user) {
  const list = await mockApi.list();
  // gera id numérico incremental (usa parseInt por segurança)
  const existingIds = list.map(u => parseInt(u.id)).filter(n => !isNaN(n));
  const nextId = existingIds.length > 0 ? Math.max(...existingIds) + 1 : 1;
  user.id = String(nextId);
  user.createdAt = new Date().toISOString();
  list.push(user);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  return user;
},
  async update(id, patch) {
    const list = await mockApi.list();
    const idx = list.findIndex(u => u.id === id);
    if (idx === -1) throw new Error('Not found');
    list[idx] = { ...list[idx], ...patch };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    return list[idx];
  },
  async remove(id) {
    let list = await mockApi.list();
    list = list.filter(u => u.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    return { ok: true };
  }
};

// Toggle: use mock (true) or real API (false)
const USE_MOCK = true;

// Example real API wrapper (not used by default)
async function apiList() {
  if (USE_MOCK) return mockApi.list();
  const res = await fetch(process.env.REACT_APP_API_BASE + '/users');
  return res.json();
}

async function apiCreate(user) {
  if (USE_MOCK) return mockApi.create(user);
  const res = await fetch(process.env.REACT_APP_API_BASE + '/users', {method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify(user)});
  return res.json();
}

async function apiUpdate(id, patch) {
  if (USE_MOCK) return mockApi.update(id, patch);
  const res = await fetch(process.env.REACT_APP_API_BASE + `/users/${id}`, {method:'PUT', headers:{'Content-Type':'application/json'}, body:JSON.stringify(patch)});
  return res.json();
}

async function apiRemove(id) {
  if (USE_MOCK) return mockApi.remove(id);
  const res = await fetch(process.env.REACT_APP_API_BASE + `/users/${id}`, {method:'DELETE'});
  return res.json();
}

// Export to XLSX with automatic column widths
function exportXlsx(items, filename = 'users.xlsx') {
  const data = items.map(u => ({
    id: u.id,
    name: u.name,
    email: u.email,
    status: u.status,
    createdAt: u.createdAt
  }));

  const ws = XLSX.utils.json_to_sheet(data || []);

  // 🔹 Calcula automaticamente a largura ideal de cada coluna
  const objectKeys = Object.keys(data[0] || { id: '', name: '', email: '', status: '', createdAt: '' });
  const colWidths = objectKeys.map(key => {
    const maxLen = Math.max(
      key.length,
      ...data.map(obj => String(obj[key] ?? '').length)
    );
    return { wch: Math.min(Math.max(maxLen + 2, 10), 60) }; // min 10, max 60
  });
  ws['!cols'] = colWidths;

  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'users');
  const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
  const blob = new Blob([wbout], { type: 'application/octet-stream' });
  saveAs(blob, filename);
}

// ---------- Main App ----------
export default function App() {
  const [users, setUsers] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [perPage] = useState(8);
  const [editing, setEditing] = useState(null);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const [report, setReport] = useState(null);

  useEffect(()=>{
    document.documentElement.setAttribute('data-theme', theme === 'dark' ? 'dark' : '');
    localStorage.setItem('theme', theme);
  },[theme]);

  useEffect(()=>{ load(); }, []);

  async function load(){
    const all = await apiList();
    setUsers(all.sort((a,b)=> new Date(b.createdAt) - new Date(a.createdAt)));
  }

  const filtered = useMemo(()=>{
    const q = query.trim().toLowerCase();
    if(!q) return users;
    return users.filter(u => u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q));
  },[users, query]);

  const pages = Math.max(1, Math.ceil(filtered.length / perPage));
  const pageItems = filtered.slice((page-1)*perPage, page*perPage);

  function resetForm(){ setEditing(null); }

  async function handleCreateOrUpdate(e){
    e.preventDefault();
    const fd = new FormData(e.target);
    const name = fd.get('name').trim();
    const email = fd.get('email').trim().toLowerCase();
    const status = fd.get('status');
    if(!name || !email){ alert('Nome e e-mail são obrigatórios'); return; }
    // unique email check (frontend)
    const exists = users.find(u => u.email === email && (editing? u.id !== editing.id : true));
    if(exists){ alert('E-mail já cadastrado'); return; }
    const payload = { name, email, status };
    if(editing){
      await apiUpdate(editing.id, payload);
      await load();
      resetForm();
    } else {
      await apiCreate(payload);
      await load();
      e.target.reset();
    }
  }

  async function handleDelete(u){
    if(!confirm(`Confirma remoção de ${u.name}?`)) return;
    await apiRemove(u.id);
    await load();
  }

  // Excel import
  async function handleImport(file){
    if(!file) return;
    const reader = new FileReader();
    reader.onload = async (evt) => {
      try{
        const data = new Uint8Array(evt.target.result);
        const wb = XLSX.read(data, {type:'array'});
        const sheet = wb.Sheets[wb.SheetNames[0]];
        const json = XLSX.utils.sheet_to_json(sheet, { defval: '' });
        const inserted = [];
        const errors = [];
        for(const [i,row] of json.entries()){
          const name = (row.name || row.Name || row.Nome || '').toString().trim();
          const email = (row.email || row.Email || row.E_mail || '').toString().trim().toLowerCase();
          const status = (row.status || row.Status || row.situacao || 'active').toString().trim() || 'active';
          if(!name || !email){ errors.push({ row: i+2, reason: 'Faltando nome ou email', data: row }); continue; }
          if(users.find(u=>u.email===email) || inserted.find(u=>u.email===email)){
            errors.push({ row: i+2, reason: 'E-mail duplicado', data: row }); continue;
          }
          try{
            const created = await apiCreate({ name, email, status });
            inserted.push(created);
          }catch(err){ errors.push({ row: i+2, reason: err.message, data: row }); }
        }
        await load();
        setReport({ total: json.length, inserted, errors });
      }catch(err){ alert('Erro ao ler arquivo: '+err.message); }
    };
    reader.readAsArrayBuffer(file);
  }

  return (
    <div className="app">
      <style>{styles}</style>
      <div className="container">
        <div className="header">
          <div>
            <h2>Gerenciamento de Usuários</h2>
            <div className="small">Modo: {USE_MOCK? 'mock (localStorage)' : 'API real'}</div>
          </div>
          <div className="controls">
            <input className="input" placeholder="Buscar por nome ou e-mail" value={query} onChange={e=>{setQuery(e.target.value); setPage(1)}} />
            <button className="btn ghost" onClick={()=>{exportXlsx(filtered);}}>Exportar XLSX</button>
            <label className="btn ghost" style={{display:'inline-flex',alignItems:'center',gap:8}}>
              <input type="file" accept=".xlsx" style={{display:'none'}} onChange={e=>handleImport(e.target.files[0])} />
              Importar Excel
            </label>
            <button className="btn" onClick={()=>setTheme(t=> t==='dark' ? 'light' : 'dark')}>{theme==='dark'? 'Tema claro' : 'Tema escuro'}</button>
          </div>
        </div>

        <div className="card">
          <form onSubmit={handleCreateOrUpdate} className="form-grid">
            <div>
              <label className="small">Nome</label>
              <input name="name" defaultValue={editing? editing.name : ''} className="input" />
            </div>
            <div>
              <label className="small">E-mail</label>
              <input name="email" defaultValue={editing? editing.email : ''} className="input" />
            </div>
            <div>
              <label className="small">Status</label>
              <select name="status" defaultValue={editing? editing.status : 'active'} className="select">
                <option value="active">Ativo</option>
                <option value="inactive">Inativo</option>
              </select>
            </div>
            <div className="full" style={{display:'flex',gap:8,justifyContent:'flex-end'}}>
              {editing && <button type="button" className="btn ghost" onClick={resetForm}>Cancelar edição</button>}
              <button className="btn">{editing? 'Salvar alterações' : 'Criar usuário'}</button>
            </div>
          </form>
        </div>

        <div style={{height:12}} />

        <div className="card">
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
            <h3 style={{margin:0}}>Usuários</h3>
            <div className="small">{filtered.length} registros</div>
          </div>

          <table className="table" role="table">
            <thead>
              <tr>
                <th>Nome</th>
                <th>E-mail</th>
                <th>Status</th>
                <th>Data criação</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {pageItems.map(u=> (
                <tr key={u.id}>
                  <td>
                    <div style={{fontWeight:700}}>{u.name}</div>
                    <div className="small">id: {u.id}</div>
                  </td>
                  <td>{u.email}</td>
                  <td>{u.status === 'active' ? <span className="status-active">Ativo</span> : <span className="status-inactive">Inativo</span>}</td>
                  <td className="small">{new Date(u.createdAt).toLocaleString()}</td>
                  <td>
                    <div className="row-actions">
                      <button className="btn ghost" onClick={()=> setEditing(u)}>Editar</button>
                      <button className="btn ghost" onClick={()=>{ navigator.clipboard?.writeText(u.email); alert('E-mail copiado'); }}>Copiar e-mail</button>
                      <button className="btn" style={{background:'var(--danger)'}} onClick={()=>handleDelete(u)}>Remover</button>
                    </div>
                  </td>
                </tr>
              ))}
              {pageItems.length===0 && (
                <tr><td colSpan={5} className="small">Nenhum usuário encontrado.</td></tr>
              )}
            </tbody>
          </table>

          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginTop:12}}>
            <div className="pagination">
              <button className="btn ghost" onClick={()=>setPage(1)} disabled={page===1}>Primeira</button>
              <button className="btn ghost" onClick={()=>setPage(p=>Math.max(1,p-1))} disabled={page===1}>Anterior</button>
              <div className="small">Página {page} de {pages}</div>
              <button className="btn ghost" onClick={()=>setPage(p=>Math.min(pages,p+1))} disabled={page===pages}>Próxima</button>
              <button className="btn ghost" onClick={()=>setPage(pages)} disabled={page===pages}>Última</button>
            </div>
            <div className="small">Exibindo {pageItems.length} de {filtered.length}</div>
          </div>
        </div>

        {report && (
          <div className="card report">
            <h4>Relatório da importação</h4>
            <div className="small">Total Linhas: {report.total} • Inseridos: {report.inserted.length} • Erros: {report.errors.length}</div>
            {report.errors.length>0 && (
              <div style={{marginTop:8}}>
                <strong>Erros:</strong>
                <ul>
                  {report.errors.map((e,i)=> <li key={i} className="small">Linha {e.row}: {e.reason}</li>)}
                </ul>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}

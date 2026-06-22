const API_URL = '/api';
let dataTableInstance = null;
let currentView = 'dashboard'; // Default halaman awal sekarang adalah Dashboard Beranda

// ==========================================
// 1. MANAJEMEN VIEW & NAVIGASI
// ==========================================
function switchView(viewName) {
    currentView = viewName;
    
    // Atur kelas aktif pada sidebar link
    document.querySelectorAll('.sb-sidenav-menu .nav-link').forEach(link => {
        link.classList.remove('active');
        if(link.getAttribute('onclick').includes(viewName)) link.classList.add('active');
    });

    const titles = {
        dashboard: { t: 'Dashboard Utama', s: 'Laporan Statistik' },
        customers: { t: 'Manajemen Customers', s: 'Daftar Pelanggan' },
        leads: { t: 'Manajemen Leads', s: 'Daftar Prospek Penjualan' },
        deals: { t: 'Manajemen Deals', s: 'Daftar Kesepakatan Berjalan' },
        contacts: { t: 'Manajemen Contacts', s: 'Daftar Kontak Relasi' },
        activities: { t: 'Log Activities', s: 'Riwayat Aktivitas' },
        users: { t: 'Manajemen Users', s: 'Daftar Akun Pengguna Sistem' }
    };

    document.getElementById('viewTitle').innerText = titles[viewName].t;
    document.getElementById('viewSubTitle').innerText = titles[viewName].s;

    if (viewName === 'dashboard') {
        renderDashboardView();
    } else {
        renderTableViewStructure(viewName);
    }
}

// ==========================================
// 2. RENDER VIEW BERANDA DASHBOARD CANGGIH
// ==========================================
async function renderDashboardView() {
    const container = document.getElementById('dynamicMainContent');
    
    // Render Layout Kartu Laporan Enterprise & Canvas Chart
    container.innerHTML = `
        <div class="row">
            <div class="col-xl-3 col-md-6">
                <div class="card bg-primary text-white mb-4">
                    <div class="card-body d-flex justify-content-between align-items-center">
                        <div><h5>Customers</h5><h2 id="dashCustCount">0</h2></div>
                        <i class="fas fa-users fa-2x"></i>
                    </div>
                </div>
            </div>
            <div class="col-xl-3 col-md-6">
                <div class="card bg-warning text-white mb-4">
                    <div class="card-body d-flex justify-content-between align-items-center">
                        <div><h5>Leads</h5><h2 id="dashLeadsCount">0</h2></div>
                        <i class="fas fa-bullseye fa-2x"></i>
                    </div>
                </div>
            </div>
            <div class="col-xl-3 col-md-6">
                <div class="card bg-success text-white mb-4">
                    <div class="card-body d-flex justify-content-between align-items-center">
                        <div><h5>Deals Volume</h5><h2 id="dashDealsVolume">Rp 0</h2></div>
                        <i class="fas fa-wallet fa-2x"></i>
                    </div>
                </div>
            </div>
            <div class="col-xl-3 col-md-6">
                <div class="card bg-danger text-white mb-4">
                    <div class="card-body d-flex justify-content-between align-items-center">
                        <div><h5>System Users</h5><h2 id="dashUsersCount">0</h2></div>
                        <i class="fas fa-user-shield fa-2x"></i>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-xl-8">
                <div class="card mb-4">
                    <div class="card-header"><i class="fas fa-chart-bar me-1"></i> Matriks Aktivitas</div>
                    <div class="card-body"><canvas id="crmMainChart" width="100%" height="40"></canvas></div>
                </div>
            </div>
            <div class="col-xl-4">
                <div class="card mb-4">
                    <div class="card-header"><i class="fas fa-bell me-1"></i> Notifikasi</div>
                    <div class="card-body">
                        <ul class="list-group list-group-flush" id="dashActivityList">
                            <li class="list-group-item text-muted text-center">Memuat riwayat aktivitas terakhir...</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Ambil Data dari API secara sekuensial untuk mengisi Dashboard Laporan
    try {
        const [resCust, resLeads, resDeals, resUsers, resAct] = await Promise.all([
            fetchAPI('/customers'), fetchAPI('/leads'), fetchAPI('/deals'), fetchAPI('/users'), fetchAPI('/activities')
        ]);

        if (resCust.success) document.getElementById('dashCustCount').innerText = resCust.total;
        if (resLeads.success) document.getElementById('dashLeadsCount').innerText = resLeads.total;
        if (resUsers.success) document.getElementById('dashUsersCount').innerText = resUsers.total;
        
        if (resDeals.success) {
            let totalVal = resDeals.data.reduce((acc, curr) => acc + parseFloat(curr.value || 0), 0);
            document.getElementById('dashDealsVolume').innerText = `Rp ${totalVal.toLocaleString('id-ID')}`;
        }

        if (resAct.success) {
            const listContainer = document.getElementById('dashActivityList');
            listContainer.innerHTML = '';
            resAct.data.slice(0, 4).forEach(act => {
                listContainer.innerHTML += `<li class="list-group-item small">
                    <i class="fas fa-info-circle text-primary me-1"></i> <b>${act.type}</b>: ${act.description}
                </li>`;
            });
        }

        // Gambar Grafik Laporan Statistik Canggih Menggunakan Chart.js
        const ctx = document.getElementById('crmMainChart').getContext('2d');
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Customers', 'Leads', 'Deals', 'Users'],
                datasets: [{
                    label: 'Total Kuantitas Data Sistem',
                    data: [resCust.total || 0, resLeads.total || 0, resDeals.total || 0, resUsers.total || 0],
                    backgroundColor: ['#0d6efd', '#ffc107', '#198754', '#dc3545'],
                    borderWidth: 1
                }]
            },
            options: { scales: { y: { beginAtZero: true } } }
        });

    } catch (err) {
        console.error("Gagal memuat visual statistik beranda:", err);
    }
}

// ==========================================
// 3. RENDER LAYOUT STRUKTUR TABEL CRUD
// ==========================================
function renderTableViewStructure(viewName) {
    const container = document.getElementById('dynamicMainContent');
    container.innerHTML = `
        <button class="btn btn-primary mb-3" id="btnActionTambah" onclick="openAddModal()">
            <i class="fas fa-plus"></i> Tambah Data ${viewName.toUpperCase()}
        </button>
        <div class="card mb-4">
            <div class="card-header">
                <i class="fas fa-table me-1"></i> Tabel Data Master ${viewName.toUpperCase()}
            </div>
            <div class="card-body">
                <div class="table-responsive" id="mainTableContainer"></div>
            </div>
        </div>
    `;

    loadTableData();
}

// ==========================================
// 4. LOAD DATA TABEL (READ WITH AUTOMATIC JOIN DATA)
// ==========================================
async function loadTableData() {
    const container = document.getElementById('mainTableContainer');
    if (!container) return;

    if (dataTableInstance) { dataTableInstance.destroy(); dataTableInstance = null; }

    try {
        const result = await fetchAPI(`/${currentView}`);
        if (!result.success) return;

        let tableHTML = `<table class="table table-bordered table-striped" id="mainCrmTable"><thead class="table-dark"><tr>`;
        
        // PERHATIAN: Semua array sekarang diakhiri dengan 'Aksi'
        const columnSchemas = {
            customers: ['Nama', 'Email', 'Perusahaan', 'Status', 'Dibuat Oleh', 'Aksi'],
            leads: ['ID', 'Judul Lead', 'Pelanggan', 'Sumber', 'Status', 'PIC', 'Aksi'],
            deals: ['ID', 'Judul Deal', 'Dari Prospek', 'Nilai', 'Status', 'Tanggal', 'Aksi'],
            contacts: ['Nama', 'Pelanggan', 'Email', 'Telepon', 'Jabatan', 'Aksi'],
            activities: ['ID', 'Pelanggan', 'Tipe', 'Keterangan', 'Waktu', 'Dibuat Oleh', 'Aksi'],
            users: ['Nama', 'Email', 'Role', 'Tgl Dibuat', 'Aksi']
        };

        columnSchemas[currentView].forEach(col => tableHTML += `<th>${col}</th>`);
        tableHTML += `</tr></thead><tbody id="mainCrmTableBody"></tbody></table>`;
        container.innerHTML = tableHTML;

        const tbody = document.getElementById('mainCrmTableBody');
        if (result.data.length === 0) {
            tbody.innerHTML = `<tr><td colspan="${columnSchemas[currentView].length}" class="text-center">Tidak ada data.</td></tr>`;
            return;
        }

        // BACA ROLE USER DARI LOCAL STORAGE
        const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
        const isAdmin = currentUser.role === 'admin';

        result.data.forEach(item => {
            const tr = document.createElement('tr');
            
            // LOGIKA KEAMANAN VISUAL: Tombol Hapus hanya dibuat jika role == admin
            const editBtnHtml = `<button class="btn btn-sm btn-warning" onclick="openEditModal(${item.id})">Edit</button>`;
            const deleteBtnHtml = isAdmin ? `<button class="btn btn-sm btn-danger ms-1" onclick="deleteItem(${item.id})">Hapus</button>` : '';
            const actionButtons = `<td>${editBtnHtml} ${deleteBtnHtml}</td>`;

            if (currentView === 'customers') {
                let statusStr = (item.status || '').toLowerCase();
                let badgeColor = 'secondary';
                if (statusStr === 'active') badgeColor = 'success';
                else if (statusStr === 'inactive') badgeColor = 'danger';
                else if (statusStr === 'lead') badgeColor = 'info';
                else if (statusStr === 'prospect') badgeColor = 'warning';

                tr.innerHTML = `<td>${item.name}</td><td>${item.email || '-'}</td><td>${item.company || '-'}</td>
                    <td><span class="badge bg-${badgeColor} text-uppercase">${item.status}</span></td>
                    <td>${item.creator_name || '-'}</td> ${actionButtons}`;
                    
            } else if (currentView === 'leads') {
                let badgeColor = item.status === 'New' ? 'info' : item.status === 'Contacted' ? 'primary' : item.status === 'Qualified' ? 'success' : 'danger';
                tr.innerHTML = `<td>${item.id}</td><td>${item.title || '-'}</td><td>${item.customer_name || 'Tanpa Pelanggan'}</td><td>${item.source || '-'}</td>
                    <td><span class="badge bg-${badgeColor}">${item.status || 'New'}</span></td><td>${item.assignee_name || 'Belum Ditugaskan'}</td> ${actionButtons}`;
                    
            } else if (currentView === 'deals') {
                let badgeColor = item.stage === 'Won' ? 'success' : item.stage === 'Lost' ? 'danger' : 'warning';
                tr.innerHTML = `<td>${item.id}</td><td>${item.title || '-'}</td><td>${item.lead_title || '-'}</td>
                    <td>Rp ${parseInt(item.value || 0).toLocaleString('id-ID')}</td><td><span class="badge bg-${badgeColor}">${item.stage || '-'}</span></td>
                    <td>${item.created_at ? item.created_at.substring(0,10) : '-'}</td> ${actionButtons}`;
                    
            } else if (currentView === 'contacts') {
                tr.innerHTML = `<td>${item.name}</td><td>${item.customer_name || '-'}</td><td>${item.email || '-'}</td><td>${item.phone || '-'}</td><td>${item.position || '-'}</td> ${actionButtons}`;
                
            } else if (currentView === 'activities') {
                let typeColor = item.type === 'Call' ? 'primary' : item.type === 'Email' ? 'info' : item.type === 'Meeting' ? 'success' : 'warning';
                let formattedDate = item.activity_date ? item.activity_date.substring(0, 16).replace('T', ' ') : '-';
                
                tr.innerHTML = `<td>${item.id}</td><td>${item.customer_name || '-'}</td>
                    <td><span class="badge bg-${typeColor}">${item.type || '-'}</span></td>
                    <td>${item.description || '-'}</td><td>${formattedDate}</td><td>${item.creator_name || '-'}</td> ${actionButtons}`;
                    
            } else if (currentView === 'users') {

                let roleColor = item.role === 'admin' ? 'danger' : (item.role === 'sales' ? 'primary' : 'info');
                
                tr.innerHTML = `<td>${item.name}</td>
                    <td>${item.email}</td>
                    <td><span class="badge bg-${roleColor} text-uppercase">${item.role}</span></td>
                    <td>${item.created_at ? item.created_at.substring(0,10) : '-'}</td> 
                    ${actionButtons}`;
            }
            tbody.appendChild(tr);
        });

        dataTableInstance = new simpleDatatables.DataTable(document.getElementById('mainCrmTable'));
    } catch (error) {
        console.error(error);
    }
}

// ==========================================
// 5. ROMBAK TOTAL OPENADDMODAL (DYNAMIC FETCH CUSTOMERS DROPDOWN)
// ==========================================
async function openAddModal() {
    const body = document.getElementById('crmModalBody');
    document.getElementById('crmForm').reset();
    
    // Tampilkan loading saat menarik relasi data
    body.innerHTML = `<div class="text-center py-4"><span class="spinner-border"></span> Menyiapkan formulir...</div>`;
    
    // Tarik data Customers dan Users sekaligus untuk kebutuhan dropdown
    const [resCust, resUsers] = await Promise.all([ fetchAPI('/customers'), fetchAPI('/users') ]);
    
    let custOpt = `<option value="">-- Pilih Pelanggan --</option>`;
    if (resCust.success) resCust.data.forEach(c => custOpt += `<option value="${c.id}">${c.name} (${c.company || 'Personal'})</option>`);
    
    let userOpt = `<option value="">-- Pilih Staf/PIC --</option>`;
    if (resUsers.success) resUsers.data.forEach(u => userOpt += `<option value="${u.id}">${u.name} (${u.role})</option>`);

    let fields = `<input type="hidden" id="targetId">`;
    
    if (currentView === 'customers') {
        fields += `<div class="mb-3"><label class="form-label">Nama Pelanggan</label><input type="text" class="form-control" id="form_1" required></div>
                   <div class="mb-3"><label class="form-label">Email</label><input type="email" class="form-control" id="form_2"></div>
                   <div class="mb-3"><label class="form-label">Telepon</label><input type="text" class="form-control" id="form_3"></div>
                   <div class="mb-3"><label class="form-label">Perusahaan</label><input type="text" class="form-control" id="form_4"></div>
                   <div class="mb-3"><label class="form-label">Status</label><select class="form-select" id="form_5">
                       <option value="active">Active</option><option value="inactive">Inactive</option>
                       <option value="lead">Lead</option><option value="prospect">Prospect</option>
                   </select></div>`;
    }
    else if (currentView === 'leads') {
        fields += `<div class="mb-3"><label class="form-label">Hubungkan ke Pelanggan</label><select class="form-select" id="form_customer" required>${custOpt}</select></div>
                   <div class="mb-3"><label class="form-label">Judul Prospek</label><input type="text" class="form-control" id="form_1" required></div>
                   <div class="mb-3"><label class="form-label">Sumber Prospek</label><input type="text" class="form-control" id="form_2"></div>
                   <div class="mb-3"><label class="form-label">Catatan</label><textarea class="form-control" id="form_3"></textarea></div>
                   <div class="mb-3"><label class="form-label">Status</label><select class="form-select" id="form_4"><option value="New">New</option><option value="Contacted">Contacted</option><option value="Qualified">Qualified</option><option value="Lost">Lost</option></select></div>
                   <div class="mb-3"><label class="form-label text-primary">PIC Ditugaskan</label><select class="form-select border-primary" id="form_user">${userOpt}</select></div>`;
    } 
    else if (currentView === 'activities') {
        // FORM BARU UNTUK ACTIVITIES
        fields += `<div class="mb-3"><label class="form-label">Terkait Pelanggan</label><select class="form-select" id="form_customer" required>${custOpt}</select></div>
                   <div class="mb-3"><label class="form-label">Tipe Aktivitas</label><select class="form-select" id="form_1" required><option value="Call">Call (Telepon)</option><option value="Email">Email</option><option value="Meeting">Meeting (Tatap Muka)</option><option value="Note">Note (Catatan)</option></select></div>
                   <div class="mb-3"><label class="form-label">Waktu Kejadian</label><input type="datetime-local" class="form-control" id="form_2" required></div>
                   <div class="mb-3"><label class="form-label">Keterangan / Hasil</label><textarea class="form-control" id="form_3" rows="3" required></textarea></div>
                   <div class="mb-3"><label class="form-label text-primary">Dilakukan Oleh (Staf)</label><select class="form-select border-primary" id="form_user" required>${userOpt}</select></div>`;
    }
    else if (currentView === 'deals') {
        const resLeads = await fetchAPI('/leads');
        let leadOpt = `<option value="">-- Pilih Prospek --</option>`;
        if (resLeads.success) resLeads.data.forEach(l => leadOpt += `<option value="${l.id}">${l.title}</option>`);
        fields += `<div class="mb-3"><label class="form-label">Sumber Prospek</label><select class="form-select" id="form_lead" required>${leadOpt}</select></div>
                   <div class="mb-3"><label class="form-label">Judul Deal</label><input type="text" class="form-control" id="form_1" required></div>
                   <div class="mb-3"><label class="form-label">Nilai (Rp)</label><input type="number" class="form-control" id="form_2" required></div>
                   <div class="mb-3"><label class="form-label">Tahapan</label><select class="form-select" id="form_3"><option value="Proposal">Proposal</option><option value="Negotiation">Negotiation</option><option value="Won">Won</option><option value="Lost">Lost</option></select></div>`;
    }
    else if (currentView === 'contacts') {
        fields += `<div class="mb-3"><label class="form-label">Perusahaan/Pelanggan</label><select class="form-select" id="form_customer" required>${custOpt}</select></div>
                   <div class="mb-3"><label class="form-label">Nama Kontak</label><input type="text" class="form-control" id="form_1" required></div>
                   <div class="mb-3"><label class="form-label">Email</label><input type="email" class="form-control" id="form_2"></div>
                   <div class="mb-3"><label class="form-label">Telepon</label><input type="text" class="form-control" id="form_3"></div>
                   <div class="mb-3"><label class="form-label">Jabatan</label><input type="text" class="form-control" id="form_4"></div>`;
    }
    else if (currentView === 'users') {
        fields += `<div class="mb-3"><label class="form-label">Nama</label><input type="text" class="form-control" id="form_1" required></div>
                   <div class="mb-3"><label class="form-label">Email</label><input type="email" class="form-control" id="form_2" required></div>
                   <div class="mb-3"><label class="form-label" id="labelPass">Password Baru</label><input type="password" class="form-control" id="form_3" required></div>
                   <div class="mb-3"><label class="form-label">Role</label>
                   <select class="form-select" id="form_4">
                       <option value="admin">Administrator</option>
                       <option value="sales">Sales</option>
                       <option value="staff">Staff</option>
                   </select></div>`;
    }

    body.innerHTML = fields;
    document.getElementById('crmModalLabel').innerText = `Tambah Data ${currentView.toUpperCase()}`;
    document.getElementById('btnSubmitForm').innerText = 'Simpan Data';
    const myModal = bootstrap.Modal.getInstance(document.getElementById('crmModal')) || new bootstrap.Modal(document.getElementById('crmModal'));
    myModal.show();
}

// ==========================================
// 6. EDIT MODAL (PULL DATA TO FORM)
// ==========================================
async function openEditModal(id) {
    await openAddModal(); 
    document.getElementById('crmModalLabel').innerText = `Ubah Data ${currentView.toUpperCase()}`;
    document.getElementById('btnSubmitForm').innerText = 'Perbarui Data';

    try {
        const result = await fetchAPI(`/${currentView}/${id}`);
        if (result.success) {
            const item = result.data;
            document.getElementById('targetId').value = item.id;
            
            if (currentView === 'customers') {
                document.getElementById('form_1').value = item.name;
                document.getElementById('form_2').value = item.email || '';
                document.getElementById('form_3').value = item.phone || '';
                document.getElementById('form_4').value = item.company || '';
                document.getElementById('form_5').value = item.status;
                document.getElementById('form_user').value = item.created_by || ''; // PIC
            } else if (currentView === 'leads') {
                document.getElementById('form_customer').value = item.customer_id;
                document.getElementById('form_1').value = item.title || '';
                document.getElementById('form_2').value = item.source || '';
                document.getElementById('form_3').value = item.notes || '';
                document.getElementById('form_4').value = item.status;
                document.getElementById('form_user').value = item.assigned_to || ''; // PIC
            } else if (currentView === 'activities') {
                document.getElementById('form_customer').value = item.customer_id;
                document.getElementById('form_1').value = item.type;
                // Potong string tanggal (YYYY-MM-DDTHH:mm:ss.000Z) agar pas di input datetime-local
                document.getElementById('form_2').value = item.activity_date ? item.activity_date.substring(0, 16) : '';
                document.getElementById('form_3').value = item.description || '';
                document.getElementById('form_user').value = item.created_by || ''; // PIC
            } else if (currentView === 'deals') {
                document.getElementById('form_lead').value = item.lead_id;
                document.getElementById('form_1').value = item.title || '';
                document.getElementById('form_2').value = item.value || '';
                document.getElementById('form_3').value = item.stage || 'Proposal';
            } else if (currentView === 'contacts') {
                document.getElementById('form_customer').value = item.customer_id;
                document.getElementById('form_1').value = item.name;
                document.getElementById('form_2').value = item.email || '';
                document.getElementById('form_3').value = item.phone || '';
                document.getElementById('form_4').value = item.position || '';
            } else if (currentView === 'users') {
                document.getElementById('form_1').value = item.name;
                document.getElementById('form_2').value = item.email;
                document.getElementById('form_3').required = false; 
                document.getElementById('labelPass').innerText = 'Password Baru (Kosongkan jika tak diganti)';
                document.getElementById('form_4').value = item.role;
            }
        }
    } catch (error) {
        console.error(error);
    }
}

// ==========================================
// 7. HANDLE SUBMIT FORM (CREATE & UPDATE PACKAGING)
// ==========================================
async function handleFormSubmit(event) {
    event.preventDefault();
    const id = document.getElementById('targetId').value;
    const btnSubmit = document.getElementById('btnSubmitForm');
    
    btnSubmit.disabled = true;
    btnSubmit.innerHTML = 'Memproses...';

    let payload = {};
    if (currentView === 'customers') {
        payload = { name: document.getElementById('form_1').value, email: document.getElementById('form_2').value, phone: document.getElementById('form_3').value, company: document.getElementById('form_4').value, status: document.getElementById('form_5').value, created_by: document.getElementById('form_user').value || null };
    } else if (currentView === 'leads') {
        payload = { customer_id: document.getElementById('form_customer').value, title: document.getElementById('form_1').value, source: document.getElementById('form_2').value, notes: document.getElementById('form_3').value, status: document.getElementById('form_4').value, assigned_to: document.getElementById('form_user').value || null };
    } else if (currentView === 'activities') {
        payload = { customer_id: document.getElementById('form_customer').value, type: document.getElementById('form_1').value, activity_date: document.getElementById('form_2').value, description: document.getElementById('form_3').value, created_by: document.getElementById('form_user').value || null };
    } else if (currentView === 'deals') {
        payload = { lead_id: document.getElementById('form_lead').value, title: document.getElementById('form_1').value, value: document.getElementById('form_2').value, stage: document.getElementById('form_3').value };
    } else if (currentView === 'contacts') {
        payload = { customer_id: document.getElementById('form_customer').value, name: document.getElementById('form_1').value, email: document.getElementById('form_2').value, phone: document.getElementById('form_3').value, position: document.getElementById('form_4').value };
    } else if (currentView === 'users') {
        payload = { name: document.getElementById('form_1').value, email: document.getElementById('form_2').value, password: document.getElementById('form_3').value, role: document.getElementById('form_4').value };
    }

    const isEdit = id !== '';
    const endpoint = isEdit ? `/${currentView}/${id}` : `/${currentView}`;
    const method = isEdit ? 'PUT' : 'POST';

    try {
        const result = await fetchAPI(endpoint, { method: method, body: JSON.stringify(payload) });
        if (result.success) {
            const modalElement = document.getElementById('crmModal');
            bootstrap.Modal.getInstance(modalElement).hide();
            const backdrop = document.querySelector('.modal-backdrop');
            if (backdrop) backdrop.remove();
            
            if(currentView === 'dashboard') renderDashboardView(); 
            else loadTableData();
        } else {
            alert('Gagal memproses aksi data: ' + result.message);
        }
    } catch (error) {
        console.error(error);
    } finally {
        btnSubmit.disabled = false;
        btnSubmit.innerText = 'Simpan';
    }
}

// ==========================================
// 8. HAPUS DATA & CORE UTALITAS SINKRONISASI
// ==========================================
async function deleteItem(id) {
    if (!confirm('Hapus data ini secara permanen dari basis data?')) return;
    try {
        const result = await fetchAPI(`/${currentView}/${id}`, { method: 'DELETE' });
        if (result.success) loadTableData();
    } catch (error) {
        console.error(error);
    }
}

function checkAuth() { const token = localStorage.getItem('token'); const path = window.location.pathname; if (!token && !path.includes('login.html')) { window.location.href = '/login.html'; } else if (token && path.includes('login.html')) { window.location.href = '/index.html'; } }
function logout() { localStorage.removeItem('token'); localStorage.removeItem('user'); window.location.href = '/login.html'; }
async function fetchAPI(endpoint, options = {}) { const token = localStorage.getItem('token'); const headers = { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`, ...options.headers }; const response = await fetch(`${API_URL}${endpoint}`, { ...options, headers }); if (response.status === 401 || response.status === 403) { logout(); } return response.json(); }

document.addEventListener('DOMContentLoaded', () => {
    checkAuth();
    const userData = localStorage.getItem('user');
    
    if (userData) {
        const user = JSON.parse(userData);
        document.getElementById('userRoleBadge').innerText = `${user.name} (${user.role.toUpperCase()})`;
        
        // Sembunyikan menu "Manajemen Users" jika yang login BUKAN admin
        if (user.role !== 'admin') {
            // PERBAIKAN: Selector dibuat lebih aman tanpa escape character
            const usersMenuLink = document.querySelector("a[onclick*='users']");
            if (usersMenuLink) {
                usersMenuLink.style.display = 'none';
            }
        }
    }
    
    // Default render saat buka web
    if(typeof renderDashboardView === 'function') renderDashboardView();
    
    const form = document.getElementById('crmForm');
    if (form) form.addEventListener('submit', handleFormSubmit);
});
// Uses supabase.js config
const dbStatus = document.getElementById('dbStatus');
const dbTable = document.getElementById('dbTable');
const dbTbody = dbTable ? dbTable.querySelector('tbody') : null;

async function fetchRegistrations() {
  dbStatus.textContent = 'Loading registrations...';
  dbTable.style.display = 'none';
  try {
    const supabase = window.supabaseClient;
    if (!supabase || typeof supabase.from !== 'function' || typeof supabase.storage !== 'object') {
      console.error('Supabase client not found or invalid.', supabase);
      dbStatus.textContent = 'Supabase client not loaded.';
      dbStatus.className = 'error';
      return;
    }
    const { data, error } = await supabase
      .from('registrations')
      .select('*');
    if (error) {
      console.error('Supabase registrations fetch error:', error);
      dbStatus.textContent = 'Error loading registrations.';
      dbStatus.className = 'error';
      return;
    }
    if (!data || data.length === 0) {
      dbStatus.textContent = 'No registrations found.';
      return;
    }
    dbStatus.style.display = 'none';
    dbTable.style.display = 'none';
    // Render dropdown UI
    const dbContainer = document.querySelector('.db-container');
    let html = '';
    // Remove duplicates by team leader enrollment number
    const seenEnroll = new Set();
    let filtered = [];
    data.forEach(reg => {
      if (reg.team_leader_enroll && !seenEnroll.has(reg.team_leader_enroll)) {
        seenEnroll.add(reg.team_leader_enroll);
        filtered.push(reg);
      }
    });
    filtered.forEach((reg, idx) => {
      let fileUrl = '';
      try {
        const fileName = `${reg.team_leader_name}-id card.pdf`;
        fileUrl = `https://zebimgjgpbphxxbyirfl.supabase.co/storage/v1/object/public/id-cards/${encodeURIComponent(fileName)}`;
      } catch (e) {
        fileUrl = 'Error';
      }
      let members = Array.isArray(reg.team_members)
        ? reg.team_members.map(m => `<li>${m.name} <span style='color:#00bcd4'>(${m.enroll})</span></li>`).join('')
        : '';
      html += `
      <div class="team-card">
        <button class="team-toggle" type="button" aria-expanded="false" aria-controls="team-details-${idx}">
          <span style="font-weight:600;color:#00bcd4;">${idx + 1}. ${reg.team_leader_name || ''}</span>
          <span style="margin-left:10px;color:#b2ebf2;">${reg.team_leader_enroll || ''}</span>
          <span style="float:right;font-size:1.2em;">&#9660;</span>
        </button>
        <div class="team-details" id="team-details-${idx}" style="display:none;">
          <div style="margin:10px 0 6px 0;"><b>Email:</b> ${reg.email || ''} &nbsp; <b>Phone:</b> ${reg.phone || ''}</div>
          <div><b>Department:</b> ${reg.department || ''} &nbsp; <b>Programme:</b> ${reg.course || ''}</div>
          <div><b>Section:</b> ${reg.section || ''} &nbsp; <b>Batch:</b> ${reg.batch || ''}</div>
          <div style="margin:10px 0 6px 0;"><b>Team Members:</b></div>
          <ul style="margin:0 0 10px 18px;padding:0;">${members}</ul>
          <div><b>ID Proof:</b> ${fileUrl && fileUrl.startsWith('http') ? `<a class='file-link' href='${fileUrl}' target='_blank'>Open PDF</a>` : fileUrl}</div>
        </div>
      </div>
      `;
    });
    // Insert after h2
    let h2 = dbContainer.querySelector('h2');
    let oldCards = dbContainer.querySelectorAll('.team-card');
    oldCards.forEach(card => card.remove());
    h2.insertAdjacentHTML('afterend', html);
    // Add toggle logic
    dbContainer.querySelectorAll('.team-toggle').forEach(btn => {
      btn.addEventListener('click', function() {
        const details = btn.nextElementSibling;
        const expanded = btn.getAttribute('aria-expanded') === 'true';
        btn.setAttribute('aria-expanded', !expanded);
        details.style.display = expanded ? 'none' : 'block';
        btn.querySelector('span:last-child').innerHTML = expanded ? '&#9660;' : '&#9650;';
      });
    });
  } catch (err) {
    console.error('Unexpected error:', err);
    dbStatus.textContent = 'Error loading registrations.';
    dbStatus.className = 'error';
  }
}

if (dbTbody) fetchRegistrations();

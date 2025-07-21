const teamMembersDiv = document.getElementById('teamMembers');
const addMemberBtn = document.getElementById('addMember');
const removeMemberBtn = document.getElementById('removeMember');
const registrationForm = document.getElementById('registrationForm');
const successMsg = document.getElementById('successMsg');

function updateMemberButtons() {
  const currentMembers = teamMembersDiv.querySelectorAll('input').length;
  const currentPairs = teamMembersDiv.querySelectorAll('.member-pair').length;
  addMemberBtn.disabled = currentPairs >= 5;
  removeMemberBtn.disabled = currentPairs <= 3;
}

addMemberBtn.addEventListener('click', () => {
  const currentMembers = teamMembersDiv.querySelectorAll('input').length;
  const currentPairs = teamMembersDiv.querySelectorAll('.member-pair').length;
  if (currentPairs < 5) {
    const memberNum = currentPairs + 1;
    const pairDiv = document.createElement('div');
    pairDiv.className = 'member-pair';
    pairDiv.style.display = 'flex';
    pairDiv.style.gap = '8px';
    pairDiv.style.marginBottom = '12px';

    const memberInput = document.createElement('input');
    memberInput.type = 'text';
    memberInput.name = 'teamMember';
    memberInput.placeholder = `Member ${memberNum} Name (required)`;
    memberInput.required = true;
    memberInput.style.flex = '1';

    const enrollInput = document.createElement('input');
    enrollInput.type = 'text';
    enrollInput.name = 'teamMemberEnroll';
    enrollInput.placeholder = `Member ${memberNum} Enrollment No (required)`;
    enrollInput.required = true;
    enrollInput.style.flex = '1';

    pairDiv.appendChild(memberInput);
    pairDiv.appendChild(enrollInput);
    teamMembersDiv.appendChild(pairDiv);
    updateMemberButtons();
  }
});

removeMemberBtn.addEventListener('click', () => {
  const currentMembers = teamMembersDiv.querySelectorAll('input').length;
  const currentPairs = teamMembersDiv.querySelectorAll('.member-pair').length;
  if (currentPairs > 2) {
    teamMembersDiv.removeChild(teamMembersDiv.lastElementChild);
    updateMemberButtons();
  }
});

// Initial state
updateMemberButtons();

registrationForm.addEventListener('submit', function(e) {
  e.preventDefault();
  let valid = true;
  // Check all required fields
  const requiredFields = [
    'teamLeaderName', 'teamLeaderEnroll', 'department', 'course', 'section', 'batch', 'email', 'phone'
  ];
  requiredFields.forEach(id => {
    const el = document.getElementById(id);
    if (!el.value.trim()) {
      el.style.borderColor = '#f77';
      valid = false;
    } else {
      el.style.borderColor = '';
    }
  });

  // ID proof validation (PDF only, max 2MB)
  const idProofInput = document.getElementById('idProof');
  const file = idProofInput.files[0];
  if (!file) {
    idProofInput.style.borderColor = '#f77';
    alert('Please upload Team Leader ID Proof (PDF, max 2MB).');
    return;
  }
  if (file.type !== 'application/pdf') {
    idProofInput.style.borderColor = '#f77';
    alert('ID Proof must be a PDF file.');
    return;
  }
  if (file.size > 2 * 1024 * 1024) {
    idProofInput.style.borderColor = '#f77';
    alert('ID Proof PDF must be less than 2MB.');
    return;
  }
  idProofInput.style.borderColor = '';

  // Email validation (non-Amity)
  const email = document.getElementById('email').value.trim();
  if (/(@amity\.edu|@amityuniversity\.in)$/i.test(email)) {
    document.getElementById('email').style.borderColor = '#f77';
    alert('Please use a non-Amity email address.');
    return;
  }

  // Phone validation
  const phone = document.getElementById('phone').value.trim();
  if (!/^[0-9]{10}$/.test(phone)) {
    document.getElementById('phone').style.borderColor = '#f77';
    alert('Please enter a valid 10-digit phone number.');
    return;
  }

  // Team members validation (min 2, max 4 pairs)
  const pairs = teamMembersDiv.querySelectorAll('.member-pair');
  if (pairs.length < 3 || pairs.length > 5) {
    alert('Other team members must be between 3 and 5, and each must have an enrollment no.');
    return;
  }
  for (let i = 0; i < pairs.length; i++) {
    const memberInput = pairs[i].querySelector('input[name="teamMember"]');
    const enrollInput = pairs[i].querySelector('input[name="teamMemberEnroll"]');
    if (!memberInput.value.trim() || !enrollInput.value.trim()) {
      memberInput.style.borderColor = enrollInput.style.borderColor = '#f77';
      valid = false;
    } else {
      memberInput.style.borderColor = enrollInput.style.borderColor = '';
    }
  }

  if (!valid) {
    alert('Please fill all required fields.');
    return;
  }

  registrationForm.style.display = 'none';
  successMsg.style.display = 'block';
});

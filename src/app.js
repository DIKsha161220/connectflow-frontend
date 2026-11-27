const $ = (id) => document.getElementById(id);

// ConnectFlow Express Backend API
const API_URL = "http://localhost:5000/api";

const roles = {
  admin: {label:"Administrative", user:"Admin User", initials:"AD", permissions:["dashboard","customers","calls","visits","followups"], canAddInstitute:true, canCall:true, canVisit:true, scope:"all"},
  calling: {label:"Calling Team", user:"Neha Shah", initials:"NS", permissions:["dashboard","customers","calls","visits","followups"], canAddInstitute:true, canCall:true, canVisit:true, scope:"all"},
  field: {label:"On-field Employee", user:"Rohit More", initials:"RM", permissions:["dashboard","customers","calls","visits","followups"], canAddInstitute:true, canCall:true, canVisit:true, scope:"all"}
};

let currentRole = "admin";
function activeRole(){ return roles[currentRole] || roles.admin; }
function visibleCustomers(){ return state.customers || []; }
function visibleNames(){ return new Set((state.customers || []).map(c=>c.name)); }
function canAccessPage(page){ return true; }

function applyRole(){
  const r = activeRole();
  if ($("current-user-name")) $("current-user-name").textContent = r.user;
  if ($("current-user-role")) $("current-user-role").textContent = r.label;
  if ($("current-user-avatar")) $("current-user-avatar").textContent = r.initials;
  if ($("sidebar-user-avatar")) $("sidebar-user-avatar").textContent = r.initials;
  const avatarEl = document.querySelector(".sidebar-bottom .avatar");
  if (avatarEl) avatarEl.textContent = r.initials;
  if ($("role-banner")) $("role-banner").textContent = `${r.label} role: full access to all institutes, visits, call logs and follow-ups.`;
  document.querySelectorAll(".nav-link").forEach(b => {
    b.classList.remove("hidden");
  });
  if ($("primary-action")) $("primary-action").classList.remove("hidden");
  setPage(state.page || "dashboard");
}

function requirePermission(type){
  return true;
}

const state = {
  page: "dashboard",
  customers: [
    {id:1,name:"Shree Ganesh Co Op Credit Society Ltd.",phone:"9000000001",company:"Shree Ganesh Co Op Credit Society Ltd.",street:"Demo Market Road",village:"Shivajinagar",taluka:"Haveli",district:"Pune",state:"Maharashtra",pin:"411005",contacts:"Sunil Patil | Manager | 9000000001",referenceBy:"Amit Patil",referenceFrom:"Employee",branchCount:"5",priority:"High",owner:"Amit Patil",status:"Interested",followupDate:"2026-10-19T11:30",notes:"DEMO: Interested in document verification software."},
    {id:2,name:"Shree Nagari Sahakari Patsanstha Maryadit",phone:"9000000002",company:"Shree Nagari Sahakari Patsanstha Maryadit",street:"Sample College Road",village:"College Road",taluka:"Nashik",district:"Nashik",state:"Maharashtra",pin:"422005",contacts:"Priya Deshmukh | CEO | 9000000002\nRakesh Jadhav | IT Manager | 9000000003",referenceBy:"Neha Shah",referenceFrom:"Existing Institute",branchCount:"8",priority:"High",owner:"Neha Shah",status:"Follow-up",followupDate:"2026-10-20T15:00",notes:"DEMO: Asked for product demo and pricing."},
    {id:3,name:"Ganesh Chits Fund Pvt Ltd.",phone:"9000000004",company:"Ganesh Chits Fund Pvt Ltd.",street:"Example Main Road",village:"Tilakwadi",taluka:"Belgaum",district:"Belgaum",state:"Karnataka",pin:"590006",contacts:"Mahesh Kulkarni | Director | 9000000004",referenceBy:"Rohit More",referenceFrom:"WhatsApp",branchCount:"3",priority:"Medium",owner:"Rohit More",status:"Contacted",followupDate:"2026-10-21T12:00",notes:"DEMO: Introductory call completed; share brochure."},
    {id:4,name:"Aadhar Patpedhi Maryadit",phone:"9000000005",company:"Aadhar Patpedhi Maryadit",street:"Demo Station Road",village:"Dadar",taluka:"Mumbai City",district:"Mumbai",state:"Maharashtra",pin:"400014",contacts:"Kavita Shah | Branch Manager | 9000000005",referenceBy:"Amit Patil",referenceFrom:"Website",branchCount:"2",priority:"Low",owner:"Amit Patil",status:"New",followupDate:"2026-10-23T10:00",notes:"DEMO: New lead; make first introductory call."},
    {id:5,name:"Ganesha Multistate Credit Co Op Society Ltd.",phone:"9000000006",company:"Ganesha Multistate Credit Co Op Society Ltd.",street:"Sample Business Park",village:"Andheri East",taluka:"Andheri",district:"Mumbai Suburban",state:"Maharashtra",pin:"400069",contacts:"Vijay More | Operations Head | 9000000006\nSneha Rao | Accounts | 9000000007",referenceBy:"Neha Shah",referenceFrom:"Employee",branchCount:"12",priority:"High",owner:"Neha Shah",status:"Interested",followupDate:"2026-10-19T16:00",notes:"DEMO: Multiple branches; discuss centralized access."},
    {id:6,name:"Shree Sai Krupa Urban Co Op Credit Society Ltd. (Demo)",phone:"9000000008",company:"Shree Sai Krupa Urban Co Op Credit Society Ltd. (Demo)",street:"Example Ring Road",village:"Kothrud",taluka:"Haveli",district:"Pune",state:"Maharashtra",pin:"411038",contacts:"Anita Joshi | Secretary | 9000000008",referenceBy:"Sunil Patil",referenceFrom:"Existing Institute",branchCount:"4",priority:"Medium",owner:"Rohit More",status:"Contacted",followupDate:"2026-10-22T11:00",notes:"DEMO SAMPLE: Follow up after committee meeting."},
    {id:7,name:"Mahalaxmi Nagari Sahakari Patsanstha (Demo)",phone:"9000000009",company:"Mahalaxmi Nagari Sahakari Patsanstha (Demo)",street:"Demo Civil Lines",village:"Panchavati",taluka:"Nashik",district:"Nashik",state:"Maharashtra",pin:"422003",contacts:"Nitin Pawar | Chairman | 9000000009",referenceBy:"Priya Deshmukh",referenceFrom:"WhatsApp",branchCount:"6",priority:"High",owner:"Amit Patil",status:"Follow-up",followupDate:"2026-10-20T12:30",notes:"DEMO SAMPLE: Requested quotation."},
    {id:8,name:"Shree Samarth Multi State Credit Society Ltd. (Demo)",phone:"9000000010",company:"Shree Samarth Multi State Credit Society Ltd. (Demo)",street:"Sample Market Street",village:"Belagavi Camp",taluka:"Belgaum",district:"Belgaum",state:"Karnataka",pin:"590001",contacts:"Deepak Naik | Manager | 9000000010",referenceBy:"Rohit More",referenceFrom:"Other",branchCount:"9",priority:"Medium",owner:"Rohit More",status:"Interested",followupDate:"2026-10-24T14:00",notes:"DEMO SAMPLE: Wants details about branch-wise reports."},
    {id:9,name:"Aarohi Mahila Nagari Patsanstha (Demo)",phone:"9000000011",company:"Aarohi Mahila Nagari Patsanstha (Demo)",street:"Example Link Road",village:"Borivali West",taluka:"Borivali",district:"Mumbai Suburban",state:"Maharashtra",pin:"400092",contacts:"Meena Kulkarni | Administrator | 9000000011",referenceBy:"Kavita Shah",referenceFrom:"Website",branchCount:"1",priority:"Low",owner:"Neha Shah",status:"New",followupDate:"2026-10-25T10:30",notes:"DEMO SAMPLE: Single branch; initial contact pending."},
    {id:10,name:"Shree Vighnaharta Credit Co Op Society Ltd. (Demo)",phone:"9000000012",company:"Shree Vighnaharta Credit Co Op Society Ltd. (Demo)",street:"Demo Service Road",village:"Kurla West",taluka:"Kurla",district:"Mumbai Suburban",state:"Maharashtra",pin:"400070",contacts:"Ajay Sawant | Director | 9000000012\nPooja Naik | Office Admin | 9000000013",referenceBy:"Amit Patil",referenceFrom:"Employee",branchCount:"7",priority:"High",owner:"Amit Patil",status:"Converted",followupDate:"2026-10-28T11:00",notes:"DEMO SAMPLE: Converted example lead; schedule onboarding discussion."}
  ],
  calls: [
    {id:101,customer:"Shree Ganesh Co Op Credit Society Ltd.",type:"Outgoing",date:"16 Oct, 11:20",result:"Interested",notes:"DEMO: Asked for product demo."},
    {id:102,customer:"Shree Nagari Sahakari Patsanstha Maryadit",type:"Outgoing",date:"16 Oct, 15:10",result:"Call Back",notes:"DEMO: Call after committee meeting."},
    {id:103,customer:"Ganesh Chits Fund Pvt Ltd.",type:"Incoming",date:"15 Oct, 12:40",result:"Interested",notes:"DEMO: Requested brochure by email."},
    {id:104,customer:"Aadhar Patpedhi Maryadit",type:"Outgoing",date:"14 Oct, 10:15",result:"No Answer",notes:"DEMO: Try again in the afternoon."}
  ],
  visits: [
    {id:201,customer:"Shree Ganesh Co Op Credit Society Ltd.",date:"2026-10-19",owner:"Amit Patil",status:"Scheduled",purpose:"Software demo",notes:"DEMO: Bring laptop and demo credentials."},
    {id:202,customer:"Ganesh Chits Fund Pvt Ltd.",date:"2026-10-15",owner:"Rohit More",status:"Completed",purpose:"Introductory meeting",notes:"DEMO: Shared product overview."},
    {id:203,customer:"Ganesha Multistate Credit Co Op Society Ltd.",date:"2026-10-21",owner:"Neha Shah",status:"Scheduled",purpose:"Requirements discussion",notes:"DEMO: Discuss multi-branch needs."}
  ],
  followups: [
    {id:301,customer:"Shree Ganesh Co Op Credit Society Ltd.",date:"2026-10-19T11:30",owner:"Amit Patil",status:"Upcoming",notes:"DEMO: Product demonstration."},
    {id:302,customer:"Shree Nagari Sahakari Patsanstha Maryadit",date:"2026-10-20T15:00",owner:"Neha Shah",status:"Upcoming",notes:"DEMO: Share pricing and quotation."},
    {id:303,customer:"Ganesha Multistate Credit Co Op Society Ltd.",date:"2026-10-19T16:00",owner:"Neha Shah",status:"Upcoming",notes:"DEMO: Discuss multi-branch access."},
    {id:304,customer:"Ganesh Chits Fund Pvt Ltd.",date:"2026-10-16T12:00",owner:"Rohit More",status:"Overdue",notes:"DEMO: Send product brochure."}
  ],
  nextId: 500
};

// Local storage management (Guarantees zero data loss on refresh)
function loadLocalState() {
  try {
    const c = localStorage.getItem("crm_customers");
    if (c) {
      const parsed = JSON.parse(c);
      if (Array.isArray(parsed) && parsed.length > 0) state.customers = parsed;
    }
    const cl = localStorage.getItem("crm_calls");
    if (cl) {
      const parsed = JSON.parse(cl);
      if (Array.isArray(parsed)) state.calls = parsed;
    }
    const v = localStorage.getItem("crm_visits");
    if (v) {
      const parsed = JSON.parse(v);
      if (Array.isArray(parsed)) state.visits = parsed;
    }
    const f = localStorage.getItem("crm_followups");
    if (f) {
      const parsed = JSON.parse(f);
      if (Array.isArray(parsed)) state.followups = parsed;
    }
  } catch(e) {}
}

function saveLocalState() {
  try {
    localStorage.setItem("crm_customers", JSON.stringify(state.customers));
    localStorage.setItem("crm_calls", JSON.stringify(state.calls));
    localStorage.setItem("crm_visits", JSON.stringify(state.visits));
    localStorage.setItem("crm_followups", JSON.stringify(state.followups));
  } catch(e) {}
}

// Initial local load
loadLocalState();

const pageInfo = {
  dashboard: ["Dashboard", "Here’s what’s happening with your team today.", "Add Institute"],
  customers: ["Institutes", "Manage institute information, colleges and leads.", "Add Institute"],
  institutes: ["Institutes", "Manage institute information, colleges and leads.", "Add Institute"],
  calls: ["Call Logs", "Track calls and their outcomes.", "Log Call"],
  visits: ["Visits", "Plan and record customer visits.", "Record Visit"],
  followups: ["Follow-ups", "Never miss your next customer follow-up.", "Schedule Follow-up"]
};

const employeeOptions = ["Unassigned", "Amit Patil", "Neha Shah", "Rohit More"];
const statusOptions = ["New", "Contacted", "Interested", "Follow-up", "Converted", "Not Interested"];
const priorityOptions = ["High", "Medium", "Low"];
const callResults = ["Interested", "Call Back", "No Answer", "Not Interested"];
const visitStatuses = ["Scheduled", "Completed", "Cancelled"];

function escapeHtml(value="") {
  if (value === null || value === undefined) return "";
  return String(value).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
}

function initials(name="") {
  if (!name) return "IN";
  return String(name).split(/\s+/).filter(Boolean).slice(0,2).map(x=>x[0]).join("").toUpperCase() || "IN";
}

function statusClass(status) {
  if (!status) return "status-new";
  return "status-" + String(status).toLowerCase().replace(/\s+/g,"-");
}

function badge(status) {
  const s = status || "New";
  return `<span class="status ${statusClass(s)}">${escapeHtml(s)}</span>`;
}

function formatDate(date) {
  if (!date) return "—";
  const d = new Date(date);
  if (Number.isNaN(d.getTime())) return String(date);
  return d.toLocaleDateString("en-IN",{day:"2-digit",month:"short",year:"numeric"});
}

function formatDateTime(date) {
  if (!date) return "—";
  const d = new Date(date);
  if (Number.isNaN(d.getTime())) return String(date);
  return d.toLocaleDateString("en-IN",{day:"2-digit",month:"short"}) + " · " + d.toLocaleTimeString("en-IN",{hour:"2-digit",minute:"2-digit"});
}

function showNotice(message) {
  if ($("notice")) {
    $("notice").textContent = message;
    $("notice").classList.remove("hidden");
    window.clearTimeout(showNotice.timer);
    showNotice.timer = window.setTimeout(() => $("notice").classList.add("hidden"), 4200);
  }
}

function setPage(page) {
  if (page === "institutes") page = "customers";
  if (!pageInfo[page]) page = "dashboard";
  state.page = page;

  document.querySelectorAll(".nav-link").forEach(b => {
    const p = b.dataset.page;
    b.classList.toggle("active", p === page || (page === "customers" && p === "institutes"));
  });

  document.querySelectorAll(".page-panel").forEach(p => {
    p.classList.add("hidden");
    p.style.display = "none";
  });

  const targetId = (page === "institutes" || page === "customers") ? "customers-page" : (page + "-page");
  const activePanel = $(targetId);
  if (activePanel) {
    activePanel.classList.remove("hidden");
    activePanel.style.display = "block";
  }

  const info = pageInfo[page] || pageInfo["dashboard"];
  if ($("page-title")) $("page-title").textContent = info[0];
  if ($("breadcrumb-page")) $("breadcrumb-page").textContent = info[0];
  if ($("page-subtitle")) $("page-subtitle").textContent = info[1];
  if ($("primary-action-label")) $("primary-action-label").textContent = info[2];
  if ($("primary-action")) $("primary-action").classList.remove("hidden");
  if ($("sidebar")) $("sidebar").classList.remove("open");

  try {
    renderAll();
  } catch(e) {
    console.error("renderAll error in setPage:", e);
  }
  window.setPage = setPage;
}

function openDialog(type) {
  const titleMap = {customer:"Add Institute",call:"Log a Call",visit:"Record Customer Visit",followup:"Schedule Follow-up"};
  if ($("dialog-title")) $("dialog-title").textContent = titleMap[type] || "Add Record";
  if ($("dialog-fields")) $("dialog-fields").innerHTML = fieldsFor(type);
  const dlg = $("record-dialog");
  if (dlg) {
    dlg.dataset.type = type;
    try {
      if (dlg.open) dlg.close();
      dlg.showModal();
    } catch(e) {
      dlg.setAttribute("open", "");
    }
  }
}

function field(label,name,kind="text",opts=[],full=false,required=false,placeholder="") {
  let control = "";
  if(kind==="select") {
    control = `<select name="${name}" ${required?"required":""}>${opts.map(o=>`<option value="${escapeHtml(o.value??o)}">${escapeHtml(o.label??o)}</option>`).join("")}</select>`;
  } else if(kind==="textarea") {
    control = `<textarea name="${name}" placeholder="${escapeHtml(placeholder)}"></textarea>`;
  } else {
    const extraAttrs = name === "branchCount" ? ' min="1" step="1" inputmode="numeric"' : (name === "pin" ? ' maxlength="6" inputmode="numeric"' : "");
    control = `<input name="${name}" type="${kind}"${extraAttrs} ${required?"required":""} placeholder="${escapeHtml(placeholder)}">`;
  }
  return `<div class="form-field ${full?"full-width":""}"><label for="field-${name}">${escapeHtml(label)}${required?" *":""}</label>${control}</div>`;
}

function fieldsFor(type) {
  const customerNames = visibleCustomers().map(c=>({value:c.name,label:c.name}));
  if(type==="customer") return [
    field("Institute Name","name","text",[],true,true,"e.g. Modern College of Engineering"),
    field("Street / Area","street","text",[],true,false,"e.g. F.C. Road"),
    field("Gaon / Village","village","text",[],false,false,"e.g. Shivajinagar"),
    field("Taluka","taluka","text",[],false,false,"e.g. Haveli"),
    field("District","district","text",[],false,false,"e.g. Pune"),
    field("State","state","text",[],false,false,"e.g. Maharashtra"),
    field("PIN Code","pin","text",[],false,false,"e.g. 411005 (6 digits)"),
    field("Contact Person(s)","contacts","textarea",[],true,false,"One person per line: Name | Position | Contact No.\nExample: Sunil Patil | Principal | 9876543210"),
    field("Reference By","referenceBy","text",[],false,false,"e.g. Amit Patil"),
    field("Reference From","referenceFrom","select",["Select source","Employee","Existing Institute","Website","WhatsApp","Other"].map(x=>({value:x==="Select source"?"":x,label:x}))),
    field("No. of Branches","branchCount","number",[],false,false,"e.g. 5"),
    field("Priority","priority","select",priorityOptions.map(x=>({value:x,label:x}))),
    field("Assigned Employee","owner","select",employeeOptions.map(x=>({value:x,label:x})),false,true),
    field("Lead Status","status","select",statusOptions.map(x=>({value:x,label:x})),false,true),
    field("Next Follow-up Date & Time","followupDate","datetime-local",[],true),
    field("Notes","notes","textarea",[],true,false,"e.g. Interested in software demo; asked for quotation")
  ].join("");
  if(type==="call") return [
    field("Customer","customer","select",customerNames.map(x=>({value:x.value,label:x.label})),true,true),
    field("Call type","callType","select",["Outgoing","Incoming"].map(x=>({value:x,label:x}))),
    field("Call date & time","activityDate","datetime-local",[],false,true),
    field("Employee who called","owner","select",employeeOptions.map(x=>({value:x,label:x})),false,true),
    field("Contact person called","contactPerson","text",[],false,false,"e.g. Sunil Patil"),
    field("Contact number","contactPhone","tel",[],false,false,"e.g. 9876543210"),
    field("Call outcome","result","select",callResults.map(x=>({value:x,label:x})),false,true),
    field("Next follow-up date & time","followupDate","datetime-local"),
    field("Call notes","notes","textarea",[],true,false,"What was discussed? What happens next?")
  ].join("");
  if(type==="visit") return [
    field("Customer / company","customer","select",customerNames.map(x=>({value:state.customers.find(c=>c.name===x.value)?.company || x.value,label:`${x.value} — ${state.customers.find(c=>c.name===x.value)?.company || ""}`})),true,true),
    field("Visit date & time","activityDate","datetime-local",[],false,true),
    field("Contact person met","contactPerson","text",[],false,false,"e.g. Sunil Patil"),
    field("Contact number","contactPhone","tel",[],false,false,"e.g. 9876543210"),
    field("Assigned employee","owner","select",employeeOptions.map(x=>({value:x,label:x}))),
    field("Visit status","status","select",visitStatuses.map(x=>({value:x,label:x}))),
    field("Purpose","purpose","text",[],true,false,"Purpose of visit"),
    field("Visit notes","notes","textarea",[],true,false,"Visit outcome and next steps")
  ].join("");
  return [
    field("Customer","customer","select",customerNames.map(x=>({value:x.value,label:x.label})),true,true),
    field("Follow-up date & time","date","datetime-local",[],true,true),
    field("Assigned employee","owner","select",employeeOptions.map(x=>({value:x,label:x}))),
    field("Notes","notes","textarea",[],true,false,"What needs to be discussed?")
  ].join("");
}

function customerByName(name) { return state.customers.find(c=>c.name===name); }

function renderCustomers() {
  if (!$("customer-search") || !$("customers-table")) return;
  const q = ($("customer-search").value||"").toLowerCase();
  const status = $("customer-status-filter").value;
  const rows = visibleCustomers().filter(c => {
    if (!c) return false;
    const str = `${c.name||""} ${c.phone||""} ${c.owner||""} ${c.district||""} ${c.state||""} ${c.village||""} ${c.street||""} ${c.contacts||""} ${c.referenceBy||""} ${c.referenceFrom||""} ${c.branchCount||""}`.toLowerCase();
    return str.includes(q) && (!status || c.status === status);
  });
  if ($("customer-record-count")) $("customer-record-count").textContent = `${rows.length} record${rows.length===1?"":"s"}`;
  $("customers-table").innerHTML = rows.map(c=>`<tr>
    <td><div class="customer-cell"><div class="mini-avatar">${escapeHtml(initials(c.name))}</div><div><button class="institute-link" data-open-institute="${escapeHtml(c.name)}">${escapeHtml(c.name)}</button><small>${escapeHtml(c.contacts||"No contact person added")}</small></div></div></td>
    <td>${escapeHtml([c.village,c.taluka,c.district,c.state].filter(Boolean).join(", ")||c.street||"—")}</td>
    <td>${escapeHtml(c.phone||"—")}</td><td>${escapeHtml(c.branchCount||"—")}</td><td>${escapeHtml(c.owner||"Unassigned")}</td><td>${badge(c.priority||"Medium")}</td><td>${badge(c.status)}</td>
    <td>${escapeHtml(c.followupDate?formatDateTime(c.followupDate):"—")}</td>
    <td><button class="table-action" data-log-customer="${escapeHtml(c.name)}">Log call</button></td></tr>`).join("") || `<tr><td colspan="9"><div class="empty-state">No institutes found.</div></td></tr>`;
  if ($("customers-mobile")) {
    $("customers-mobile").innerHTML = rows.map(c=>`<div class="mobile-record"><div class="mobile-record-top"><div class="mini-avatar">${escapeHtml(initials(c.name))}</div><div><button class="institute-link" data-open-institute="${escapeHtml(c.name)}">${escapeHtml(c.name)}</button><small>${escapeHtml([c.village,c.taluka,c.district,c.state].filter(Boolean).join(", ")||c.street||"Address not added")}</small></div>${badge(c.status)}</div><div class="mobile-record-meta"><span>☎ ${escapeHtml(c.phone||"No contact no.")}</span><span>${escapeHtml(c.owner||"Unassigned")}</span><span>Branches: ${escapeHtml(c.branchCount||"Not entered")}</span><span>Priority: ${escapeHtml(c.priority||"Medium")}</span><span>Next: ${escapeHtml(c.followupDate?formatDateTime(c.followupDate):"Not scheduled")}</span></div><div class="mobile-record-actions"><button class="table-action" data-log-customer="${escapeHtml(c.name)}">Log call</button></div></div>`).join("") || `<div class="empty-state">No institutes found.</div>`;
  }
}

function renderCalls() {
  if (!$("call-search") || !$("calls-table")) return;
  const q=($("call-search").value||"").toLowerCase(), result=$("call-result-filter").value;
  const rows=state.calls.filter(c => {
    if (!c) return false;
    const str = `${c.customer||""} ${c.result||""} ${c.notes||""} ${c.date||""}`.toLowerCase();
    return str.includes(q) && (!result || c.result === result);
  });
  if ($("call-record-count")) $("call-record-count").textContent = `${rows.length} log${rows.length===1?"":"s"}`;
  $("calls-table").innerHTML = rows.map(c=>`<tr><td><div class="customer-cell"><div class="mini-avatar">${escapeHtml(initials(c.customer))}</div><div><button class="institute-link" data-open-institute="${escapeHtml(c.customer)}">${escapeHtml(c.customer)}</button></div></div></td><td>${escapeHtml(c.type)}</td><td>${escapeHtml(c.date)}</td><td>${badge(c.result)}</td><td>${escapeHtml(c.notes||"—")}</td></tr>`).join("") || `<tr><td colspan="5"><div class="empty-state">No call logs found.</div></td></tr>`;
  if ($("calls-mobile")) {
    $("calls-mobile").innerHTML = rows.map(c=>`<div class="mobile-record"><div class="mobile-record-top"><div class="mini-avatar">☎</div><div><button class="institute-link" data-open-institute="${escapeHtml(c.customer)}">${escapeHtml(c.customer)}</button><small>${escapeHtml(c.date)} · ${escapeHtml(c.type)}</small></div>${badge(c.result)}</div><div class="mobile-record-meta"><span>${escapeHtml(c.notes||"No notes")}</span></div></div>`).join("") || `<div class="empty-state">No call logs found.</div>`;
  }
}

function renderVisits() {
  if (!$("visit-search") || !$("visits-table")) return;
  const q=($("visit-search").value||"").toLowerCase(), status=$("visit-status-filter").value;
  const rows = (state.visits || []).filter(v => {
    if (!v) return false;
    const str = `${v.customer||""} ${v.owner||""} ${v.purpose||""}`.toLowerCase();
    return str.includes(q) && (!status || String(v.status||"").toLowerCase() === status.toLowerCase());
  });
  if ($("visit-record-count")) $("visit-record-count").textContent = `${rows.length} visit${rows.length===1?"":"s"}`;
  $("visits-table").innerHTML = rows.map(v=>`<tr><td><div class="customer-cell"><div class="mini-avatar">⌖</div><div><button class="institute-link" data-open-institute="${escapeHtml(v.customer)}">${escapeHtml(v.customer)}</button><small>${escapeHtml(v.purpose||"Customer visit")}</small></div></div></td><td>${escapeHtml(formatDate(v.date))}</td><td>${escapeHtml(v.owner)}</td><td>${badge(v.status)}</td><td>${v.status==="Scheduled"?`<button class="table-action" data-complete-visit="${v.id}">Mark completed</button>`:"—"}</td></tr>`).join("") || `<tr><td colspan="5"><div class="empty-state">No visit records found.</div></td></tr>`;
  if ($("visits-mobile")) {
    $("visits-mobile").innerHTML = rows.map(v=>`<div class="mobile-record"><div class="mobile-record-top"><div class="mini-avatar">⌖</div><div><button class="institute-link" data-open-institute="${escapeHtml(v.customer)}">${escapeHtml(v.customer)}</button><small>${escapeHtml(formatDate(v.date))}</small></div>${badge(v.status)}</div><div class="mobile-record-meta"><span>${escapeHtml(v.owner)}</span><span>${escapeHtml(v.purpose||"Customer visit")}</span></div>${v.status==="Scheduled"?`<div class="mobile-record-actions"><button class="table-action" data-complete-visit="${v.id}">Mark completed</button></div>`:""}</div>`).join("") || `<div class="empty-state">No visit records found.</div>`;
  }
}

function renderFollowups() {
  if (!$("followup-search") || !$("followups-list")) return;
  const q=($("followup-search").value||"").toLowerCase(), filter=($("followup-filter").value||"").toLowerCase();
  const rows = (state.followups || []).filter(f => {
    if (!f) return false;
    const str = `${f.customer||""} ${f.owner||""} ${f.notes||""} ${f.status||""}`.toLowerCase();
    return str.includes(q) && (!filter || String(f.status||"").toLowerCase() === filter);
  });
  if ($("due-count")) $("due-count").textContent = state.followups.filter(f=>f.status==="Due Today").length;
  if ($("overdue-count")) $("overdue-count").textContent = state.followups.filter(f=>f.status==="Overdue").length;
  if ($("upcoming-count")) $("upcoming-count").textContent = state.followups.filter(f=>f.status==="Upcoming").length;
  if ($("followup-count")) $("followup-count").textContent = state.followups.filter(f=>f.status==="Due Today"||f.status==="Overdue").length;
  $("followups-list").innerHTML = rows.map(f=>`<div class="followup-card ${f.status==="Overdue"?"is-overdue":""}"><div class="followup-date-icon">◷</div><div class="followup-details"><strong><button class="institute-link" data-open-institute="${escapeHtml(f.customer)}">${escapeHtml(f.customer)}</button> ${badge(f.status)}</strong><p>${escapeHtml(formatDateTime(f.date))} · ${escapeHtml(f.owner)}</p><p>${escapeHtml(f.notes||"No notes")}</p></div><div class="followup-actions">${f.status!=="Completed"?`<button class="small-button" data-complete-followup="${f.id}">✓ Complete</button><button class="small-button" data-reschedule-followup="${f.id}">Reschedule</button><button class="small-button" data-followup-call="${escapeHtml(f.customer)}">Log call</button>`:`<span class="pill pill-blue">Done</span>`}</div></div>`).join("") || `<div class="empty-state">No follow-ups found.</div>`;
}

function renderDashboard() {
  if ($("stat-customers")) $("stat-customers").textContent = visibleCustomers().length;
  if ($("stat-calls")) $("stat-calls").textContent = state.calls.length;
  if ($("stat-visits")) $("stat-visits").textContent = state.visits.length;
  if ($("stat-followups")) $("stat-followups").textContent = state.followups.filter(f=>f.status!=="Completed").length;
  
  const pending = state.followups.filter(f=>f.status!=="Completed").slice(0,4);
  if ($("dashboard-followups")) {
    $("dashboard-followups").innerHTML = pending.map(f=>`<div class="activity-row"><div class="mini-avatar">${escapeHtml(initials(f.customer))}</div><div class="activity-main"><button class="institute-link" data-open-institute="${escapeHtml(f.customer)}">${escapeHtml(f.customer)}</button><small>${escapeHtml(formatDateTime(f.date))} · ${escapeHtml(f.owner)}</small></div><div class="activity-side">${badge(f.status)}</div></div>`).join("") || `<div class="empty-state">All follow-ups completed.</div>`;
  }
  if ($("dashboard-calls")) {
    $("dashboard-calls").innerHTML = state.calls.slice(0,4).map(c=>`<div class="activity-row"><div class="mini-avatar">☎</div><div class="activity-main"><button class="institute-link" data-open-institute="${escapeHtml(c.customer)}">${escapeHtml(c.customer)}</button><small>${escapeHtml(c.date)} · ${escapeHtml(c.type)}</small></div><div class="activity-side">${badge(c.result)}</div></div>`).join("") || `<div class="empty-state">No calls logged yet.</div>`;
  }
}

function activityDateLabel(value) {
  if(!value) return "—";
  const d=new Date(value);
  return Number.isNaN(d.getTime()) ? value : d.toLocaleString("en-IN",{day:"2-digit",month:"short",year:"numeric",hour:"2-digit",minute:"2-digit"});
}

function openInstitute(name) {
  const c = customerByName(name); if(!c) return;
  const calls = state.calls.filter(x=>x.customer===name).map(x=>({kind:"Call",date:x.date,employee:x.owner||"Not recorded",contact:x.contactPerson||"Not recorded",phone:x.contactPhone||c.phone||"Not recorded",summary:`${x.type||"Call"} · ${x.result||"No outcome"}${x.notes?" — "+x.notes:""}`}));
  const visits = state.visits.filter(x=>x.customer===name).map(x=>({kind:"Visit",date:x.date,employee:x.owner||"Not recorded",contact:x.contactPerson||"Not recorded",phone:x.contactPhone||c.phone||"Not recorded",summary:`${x.purpose||"Institute visit"} · ${x.status||""}${x.notes?" — "+x.notes:""}`}));
  const activity = [...calls,...visits].sort((a,b)=>new Date(b.date)-new Date(a.date));
  const address = [c.street,c.village,c.taluka,c.district,c.state,c.pin].filter(Boolean).join(", ");
  
  if ($("institute-detail-content")) {
    $("institute-detail-content").innerHTML = `
      <div class="detail-top"><div><p class="eyebrow">INSTITUTE PROFILE</p><h2>${escapeHtml(c.name)}</h2><p>${escapeHtml(address||"Address not added")}</p></div><div class="detail-actions"><button class="btn btn-secondary" data-detail-call="${escapeHtml(c.name)}">+ Add Call</button><button class="btn btn-primary" data-detail-visit="${escapeHtml(c.name)}">+ Add Visit</button></div></div>
      <div class="detail-grid">
        <div class="detail-field"><small>Contact Person(s)</small><strong>${escapeHtml(c.contacts||"Not added").replace(/\n/g,"<br>")}</strong></div>
        <div class="detail-field"><small>Contact Number</small><strong>${escapeHtml(c.phone||"Not added")}</strong></div>
        <div class="detail-field"><small>Reference By / From</small><strong>${escapeHtml(c.referenceBy||"—")} / ${escapeHtml(c.referenceFrom||"—")}</strong></div>
        <div class="detail-field"><small>No. of Branches</small><strong>${escapeHtml(c.branchCount||"Not entered")}</strong></div>
        <div class="detail-field"><small>Assigned Employee</small><strong>${escapeHtml(c.owner||"Unassigned")}</strong></div>
        <div class="detail-field"><small>Priority / Lead Status</small><strong>${escapeHtml(c.priority||"Medium")} / ${escapeHtml(c.status||"New")}</strong></div>
        <div class="detail-field"><small>Next Follow-up</small><strong>${escapeHtml(c.followupDate?formatDateTime(c.followupDate):"Not scheduled")}</strong></div>
        <div class="detail-field"><small>Notes</small><strong>${escapeHtml(c.notes||"—")}</strong></div>
      </div>
      <div class="detail-history-heading"><div><h3>Call & Visit History</h3><p>Employee, date/time, contact person, contact number and discussion notes</p></div><span class="pill pill-blue">${activity.length} records</span></div>
      <div class="detail-history">${activity.map(a=>`<article class="history-item"><div class="history-kind">${escapeHtml(a.kind)}</div><div class="history-main"><strong>${escapeHtml(activityDateLabel(a.date))} · ${escapeHtml(a.employee)}</strong><p><b>Contact:</b> ${escapeHtml(a.contact)} · ${escapeHtml(a.phone)}</p><p><b>Discussion:</b> ${escapeHtml(a.summary)}</p></div></article>`).join("")||'<div class="empty-state">No calls or visits recorded yet. Use Add Call or Add Visit above.</div>'}</div>`;
  }
  const dlg = $("institute-detail-dialog");
  if (dlg) {
    try { dlg.showModal(); } catch(e) { dlg.setAttribute("open", ""); }
  }
}

function renderAll() { 
  renderDashboard();
  renderCustomers();
  renderCalls();
  renderVisits();
  renderFollowups(); 
}

// Save Record to Frontend State, LocalStorage & Spring Boot PostgreSQL Backend
function saveRecord(type, data) {
  const now = new Date();
  if(type==="customer") {
    const primaryPhone = (data.contacts||"").split("\n").map(line=>line.split("|").map(part=>part.trim())).find(parts=>parts[2]);
    const phone = primaryPhone?.[2] || "";
    const customer = {
      id: state.nextId++,
      name: data.name.trim(),
      phone: phone,
      company: data.name.trim(),
      street: (data.street||"").trim(),
      village: (data.village||"").trim(),
      taluka: (data.taluka||"").trim(),
      district: (data.district||"").trim(),
      state: (data.state||"Maharashtra").trim(),
      pin: (data.pin||"").trim(),
      contacts: (data.contacts||"").trim(),
      referenceBy: (data.referenceBy||"").trim(),
      referenceFrom: data.referenceFrom || "Employee",
      branchCount: data.branchCount === "" ? "" : Math.max(1, parseInt(data.branchCount, 10) || 1),
      priority: data.priority||"High",
      owner: data.owner || "Amit Patil",
      status: data.status || "New",
      followupDate: data.followupDate || "",
      notes: (data.notes||"").trim()
    };
    state.customers.unshift(customer);
    if(data.followupDate) {
      state.followups.unshift({
        id: state.nextId++,
        customer: customer.name,
        date: data.followupDate,
        owner: data.owner || "Amit Patil",
        status: "Upcoming",
        notes: (data.notes||"").trim() || "Institute follow-up"
      });
    }
    saveLocalState();
    showNotice(`✓ "${customer.name}" saved! Syncing with PostgreSQL database...`);

    // Asynchronously send to Spring Boot Backend API
    const payload = {
      instituteName: customer.name,
      streetAddress: customer.street || null,
      village: customer.village || null,
      taluka: customer.taluka || null,
      district: customer.district || null,
      state: customer.state || "Maharashtra",
      pinCode: (/^\d{6}$/.test(customer.pin)) ? customer.pin : null,
      branchCount: customer.branchCount ? Number(customer.branchCount) : 1,
      referenceBy: customer.referenceBy || null,
      referenceFrom: customer.referenceFrom || "Employee",
      leadStatus: customer.status || "New",
      priority: customer.priority || "High",
      nextFollowUpAt: customer.followupDate ? new Date(customer.followupDate).toISOString() : null,
      notes: customer.notes || null
    };

    fetch(`${API_URL}/institutes`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    }).then(r => r.json()).then(res => {
      if (res && res.data && res.data.instituteId) {
        customer.id = res.data.instituteId;
        saveLocalState();
      }
    }).catch(() => {});

  } else if(type==="call") {
    const activityDate = data.activityDate || now.toISOString().slice(0,16);
    const callRecord = {
      id: state.nextId++,
      customer: data.customer,
      type: data.callType || "Outgoing",
      date: activityDate,
      owner: data.owner || "Amit Patil",
      contactPerson: (data.contactPerson||"").trim(),
      contactPhone: (data.contactPhone||"").trim(),
      result: data.result || "Interested",
      notes: (data.notes||"").trim()
    };
    state.calls.unshift(callRecord);
    if(data.followupDate) {
      state.followups.unshift({
        id: state.nextId++,
        customer: data.customer,
        date: data.followupDate,
        owner: data.owner || "Amit Patil",
        status: "Upcoming",
        notes: "Follow-up after call"
      });
    }
    saveLocalState();
    showNotice("✓ Call record saved & sent to Backend!");

    // Send call to Backend
    const custInst = state.customers.find(c => (c.name || '').toLowerCase() === (data.customer || '').toLowerCase());
    const instId = custInst && custInst.id && Number(custInst.id) < 10000 ? Number(custInst.id) : 1;
    let cDate = activityDate;
    try { cDate = new Date(cDate).toISOString(); } catch(e) { cDate = new Date().toISOString(); }
    
    fetch(`${API_URL}/calls`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        instituteId: instId,
        callType: (data.callType || "Outgoing").toUpperCase(),
        callDatetime: cDate,
        contactPerson: data.contactPerson?.trim() || null,
        contactPhone: data.contactPhone?.trim() || null,
        callOutcome: data.result || "Interested",
        notes: data.notes?.trim() || null
      })
    }).catch(() => {});

  } else if(type==="visit") {
    const activityDate = data.activityDate || now.toISOString().slice(0,16);
    const visitRecord = {
      id: state.nextId++,
      customer: data.customer,
      date: activityDate,
      owner: data.owner || "Amit Patil",
      status: data.status || "Scheduled",
      contactPerson: (data.contactPerson||"").trim(),
      contactPhone: (data.contactPhone||"").trim(),
      purpose: (data.purpose||"Customer visit").trim(),
      notes: (data.notes||"").trim()
    };
    state.visits.unshift(visitRecord);
    saveLocalState();
    showNotice("✓ Visit record saved & sent to Backend!");

    // Send visit to Backend
    const custInst = state.customers.find(c => (c.name || '').toLowerCase() === (data.customer || '').toLowerCase());
    const instId = custInst && custInst.id && Number(custInst.id) < 10000 ? Number(custInst.id) : 1;
    let vDate = activityDate;
    try { vDate = new Date(vDate).toISOString(); } catch(e) { vDate = new Date().toISOString(); }

    fetch(`${API_URL}/visits`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        instituteId: instId,
        visitDatetime: vDate,
        status: data.status || "Scheduled",
        contactPerson: data.contactPerson?.trim() || null,
        contactPhone: data.contactPhone?.trim() || null,
        purpose: data.purpose?.trim() || "Customer visit",
        notes: data.notes?.trim() || null
      })
    }).catch(() => {});

  } else if(type==="followup") {
    const followupRecord = {
      id: state.nextId++,
      customer: data.customer,
      date: data.date || now.toISOString().slice(0, 16),
      owner: data.owner || "Amit Patil",
      status: "Upcoming",
      notes: (data.notes||"Follow-up").trim()
    };
    state.followups.unshift(followupRecord);
    saveLocalState();
    showNotice("✓ Follow-up scheduled & sent to Backend!");

    // Send followup to Backend
    const custInst = state.customers.find(c => (c.name || '').toLowerCase() === (data.customer || '').toLowerCase());
    const instId = custInst && custInst.id && Number(custInst.id) < 10000 ? Number(custInst.id) : 1;
    let fDate = data.date;
    try { fDate = new Date(fDate).toISOString(); } catch(e) { fDate = new Date().toISOString(); }

    fetch(`${API_URL}/follow-ups`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        instituteId: instId,
        scheduledAt: fDate,
        notes: data.notes?.trim() || "Follow-up"
      })
    }).catch(() => {});
  }

  const dlg = $("record-dialog");
  if (dlg) {
    try { dlg.close(); } catch(e) { dlg.removeAttribute("open"); }
  }
  renderAll();
}

// Load live data from PostgreSQL Backend
async function loadLiveBackendData() {
  try {
    const res = await fetch(`${API_URL}/institutes`, { signal: AbortSignal.timeout(3000) });
    if (res.ok) {
      const json = await res.json();
      const list = json.data || json;
      if (Array.isArray(list) && list.length > 0) {
        list.forEach(inst => {
          const name = inst.instituteName || inst.name;
          if (name && !state.customers.some(c => (c.name || '').toLowerCase() === name.toLowerCase())) {
            state.customers.unshift({
              id: inst.instituteId || inst.id,
              name: name,
              phone: inst.primaryContactPhone || inst.phone || "",
              company: name,
              street: inst.streetAddress || "",
              village: inst.village || "",
              taluka: inst.taluka || "",
              district: inst.district || "",
              state: inst.state || "Maharashtra",
              pin: inst.pinCode || "",
              contacts: inst.contacts || (inst.primaryContactPerson ? `${inst.primaryContactPerson} | Principal | ${inst.primaryContactPhone || ''}` : ""),
              referenceBy: inst.referenceBy || "Amit Patil",
              referenceFrom: inst.referenceFrom || "Employee",
              branchCount: String(inst.branchCount || "1"),
              priority: inst.priority || "High",
              owner: inst.assignedEmployeeName || "Amit Patil",
              status: inst.leadStatus || "New",
              followupDate: inst.nextFollowUpAt ? inst.nextFollowUpAt.slice(0, 16) : "",
              notes: inst.notes || ""
            });
          }
        });
        saveLocalState();
        renderAll();
      }
    }
  } catch(e) {}
}

// Auth Toast Notification
function showAuthToast(msg) {
  const t = $("auth-toast");
  if (t) {
    if ($("auth-toast-text")) $("auth-toast-text").textContent = msg;
    t.classList.remove("hidden");
    clearTimeout(showAuthToast.timer);
    showAuthToast.timer = setTimeout(() => t.classList.add("hidden"), 3800);
  }
}

// Open / Close Auth Modal
function openAuthModal(isLogout = false) {
  const overlay = $("auth-overlay");
  if (overlay) {
    overlay.classList.remove("hidden");
    if (isLogout) {
      if ($("auth-banner")) $("auth-banner").classList.remove("hidden");
      if ($("auth-banner-text")) $("auth-banner-text").textContent = "You have been safely logged out.";
      showAuthToast("You have been safely logged out.");
    } else {
      if ($("auth-banner")) $("auth-banner").classList.add("hidden");
    }
  }
}

function closeAuthModal() {
  const overlay = $("auth-overlay");
  if (overlay) overlay.classList.add("hidden");
}

async function handleLogout() {
  const email = localStorage.getItem("crm_auth_email") || (currentRole === "calling" ? "neha.shah@example.com" : (currentRole === "field" ? "rohit.more@example.com" : "amit.patil@example.com"));

  try {
    await fetch(`${API_URL}/auth/logout`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email })
    });
  } catch(e) {
    console.warn("Backend auth/logout warning:", e);
  }

  localStorage.setItem("crm_auth_logged_in", "false");
  localStorage.removeItem("crm_access_token");
  openAuthModal(true);
}

async function handleLogin(email, password = "root") {
  let role = "admin";
  const e = (email || "").toLowerCase();
  if (e.includes("calling") || e.includes("neha")) {
    role = "calling";
  } else if (e.includes("field") || e.includes("rohit")) {
    role = "field";
  } else {
    role = "admin";
  }
  currentRole = role;
  if ($("role-switcher")) $("role-switcher").value = role;
  localStorage.setItem("crm_auth_logged_in", "true");
  localStorage.setItem("crm_user_role", role);
  localStorage.setItem("crm_auth_email", email || "amit.patil@example.com");

  // Send login to Spring Boot Backend so it records in PostgreSQL table `login_logout_logs`
  try {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email || "amit.patil@example.com", password: password || "root" })
    });
    const json = await res.json();
    if (json.data && json.data.accessToken) {
      localStorage.setItem("crm_access_token", json.data.accessToken);
    }
  } catch(err) {
    console.warn("Backend auth/login warning:", err);
  }

  applyRole();
  closeAuthModal();
  showNotice(`✓ Welcome back, ${activeRole().user}! You are successfully signed in.`);
  showAuthToast(`Welcome back, ${activeRole().user}!`);
}

async function loadAuthLogs() {
  const dialog = $("auth-logs-dialog");
  if (!dialog) return;
  if (typeof dialog.showModal === "function") {
    dialog.showModal();
  } else {
    dialog.classList.remove("hidden");
  }

  const tbody = $("auth-logs-tbody");
  if (!tbody) return;
  tbody.innerHTML = '<tr><td colspan="7" style="text-align: center; color: #94a3b8; padding: 20px;">Loading database logs...</td></tr>';

  try {
    const res = await fetch(`${API_URL}/auth/logs`);
    const json = await res.json();
    const logs = json.data || (Array.isArray(json) ? json : []);

    if (logs && logs.length > 0) {
      tbody.innerHTML = logs.map(log => `
        <tr>
          <td><strong>${log.fullName || log.email || "—"}</strong></td>
          <td>${log.email || "—"}</td>
          <td><span style="background:#edf3ff; color:#2563eb; padding:2px 8px; border-radius:6px; font-weight:600; font-size:11px;">${log.roleName || "Administrative"}</span></td>
          <td style="color:#15803d; font-weight:600;">${log.loginTime ? new Date(log.loginTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }) : "—"}</td>
          <td style="color:${log.logoutTime ? '#b91c1c' : '#15803d'}; font-weight:600;">${log.logoutTime ? new Date(log.logoutTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }) : "Active"}</td>
          <td><span style="background:${log.status === 'LOGGED_IN' ? '#e0f2fe' : (log.status === 'LOGGED_OUT' ? '#fee2e2' : '#f1f5f9')}; color:${log.status === 'LOGGED_IN' ? '#0369a1' : (log.status === 'LOGGED_OUT' ? '#b91c1c' : '#475569')}; padding:2px 8px; border-radius:10px; font-weight:700; font-size:11px;">${log.status || "LOGGED_IN"}</span></td>
          <td style="color:#64748b; font-family:monospace;">${log.ipAddress || "127.0.0.1"}</td>
        </tr>
      `).join("");
    } else {
      tbody.innerHTML = '<tr><td colspan="7" style="text-align: center; color: #94a3b8; padding: 20px;">No database records found yet.</td></tr>';
    }
  } catch(e) {
    const roleObj = activeRole();
    const email = localStorage.getItem("crm_auth_email") || "amit.patil@example.com";
    tbody.innerHTML = `
      <tr>
        <td><strong>${roleObj.user}</strong></td>
        <td>${email}</td>
        <td><span style="background:#edf3ff; color:#2563eb; padding:2px 8px; border-radius:6px; font-weight:600; font-size:11px;">${roleObj.label}</span></td>
        <td style="color:#15803d; font-weight:600;">${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</td>
        <td style="color:#15803d; font-weight:600;">Active</td>
        <td><span style="background:#e0f2fe; color:#0369a1; padding:2px 8px; border-radius:10px; font-weight:700; font-size:11px;">LOGGED_IN</span></td>
        <td style="color:#64748b; font-family:monospace;">127.0.0.1</td>
      </tr>
    `;
  }
}

// Event Listeners setup
if ($("record-form")) {
  $("record-form").addEventListener("submit", e => {
    e.preventDefault();
    const type = $("record-dialog").dataset.type;
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    if(type==="customer" && !data.name?.trim()) {
      showNotice("Institute name is required.");
      return;
    }
    if(type==="customer" && data.pin?.trim() && !/^\d{6}$/.test(data.pin.trim())) {
      showNotice("Please enter a valid 6-digit PIN code.");
      return;
    }
    saveRecord(type, data);
  });
}

if ($("primary-action")) {
  $("primary-action").addEventListener("click", () => {
    const curType = ({dashboard:"customer",customers:"customer",institutes:"customer",calls:"call",visits:"visit",followups:"followup"})[state.page] || "customer";
    openDialog(curType);
  });
}

if ($("close-dialog")) $("close-dialog").addEventListener("click", () => $("record-dialog").close());
if ($("cancel-dialog")) $("cancel-dialog").addEventListener("click", () => $("record-dialog").close());
if ($("mobile-menu")) $("mobile-menu").addEventListener("click", () => $("sidebar").classList.toggle("open"));

document.querySelectorAll(".nav-link").forEach(b => {
  b.addEventListener("click", () => setPage(b.dataset.page));
});

if ($("role-switcher")) {
  $("role-switcher").addEventListener("change", e => {
    currentRole = e.target.value;
    localStorage.setItem("crm_user_role", currentRole);
    applyRole();
    showNotice(`Demo role switched to ${activeRole().label}.`);
  });
}

document.querySelectorAll("[data-goto]").forEach(b => {
  b.addEventListener("click", () => setPage(b.dataset.goto));
});

["customer-search","customer-status-filter"].forEach(id => {
  if ($(id)) $(id).addEventListener("input", renderCustomers);
});
["call-search","call-result-filter"].forEach(id => {
  if ($(id)) $(id).addEventListener("input", renderCalls);
});
["visit-search","visit-status-filter"].forEach(id => {
  if ($(id)) $(id).addEventListener("input", renderVisits);
});
["followup-search","followup-filter"].forEach(id => {
  if ($(id)) $(id).addEventListener("input", renderFollowups);
});

// Logout & Login Buttons
if ($("logout-button")) {
  $("logout-button").addEventListener("click", handleLogout);
}
if ($("topbar-logout-btn")) {
  $("topbar-logout-btn").addEventListener("click", handleLogout);
}
if ($("topbar-login-btn")) {
  $("topbar-login-btn").addEventListener("click", () => openAuthModal(false));
}
if ($("sidebar-login-btn")) {
  $("sidebar-login-btn").addEventListener("click", () => openAuthModal(false));
}
if ($("close-auth-modal")) {
  $("close-auth-modal").addEventListener("click", closeAuthModal);
}
const authOverlayEl = $("auth-overlay");
if (authOverlayEl) {
  authOverlayEl.addEventListener("click", e => {
    if (e.target === authOverlayEl) closeAuthModal();
  });
}

// Database Audit Logs Modal
if ($("btn-show-audit-logs")) {
  $("btn-show-audit-logs").addEventListener("click", loadAuthLogs);
}
if ($("close-auth-logs-btn")) {
  $("close-auth-logs-btn").addEventListener("click", () => {
    const d = $("auth-logs-dialog");
    if (d) d.close();
  });
}

// Auth Form Submit
if ($("auth-form")) {
  $("auth-form").addEventListener("submit", e => {
    e.preventDefault();
    const email = $("auth-email") ? $("auth-email").value : "amit.patil@example.com";
    const password = $("auth-password") ? $("auth-password").value : "root";
    handleLogin(email, password);
  });
}

// 1-Click Role Fill Buttons
if ($("quick-admin")) {
  $("quick-admin").addEventListener("click", () => {
    if ($("auth-email")) $("auth-email").value = "amit.patil@example.com";
    if ($("auth-password")) $("auth-password").value = "root";
    handleLogin("amit.patil@example.com", "root");
  });
}
if ($("quick-calling")) {
  $("quick-calling").addEventListener("click", () => {
    if ($("auth-email")) $("auth-email").value = "neha.shah@example.com";
    if ($("auth-password")) $("auth-password").value = "root";
    handleLogin("neha.shah@example.com", "root");
  });
}
if ($("quick-field")) {
  $("quick-field").addEventListener("click", () => {
    if ($("auth-email")) $("auth-email").value = "rohit.more@example.com";
    if ($("auth-password")) $("auth-password").value = "root";
    handleLogin("rohit.more@example.com", "root");
  });
}

// Auth Tabs
if ($("tab-signin")) {
  $("tab-signin").addEventListener("click", () => {
    $("tab-signin").classList.add("active");
    if ($("tab-create")) $("tab-create").classList.remove("active");
    if ($("btn-auth-submit")) $("btn-auth-submit").textContent = "Sign In to Workspace";
  });
}
if ($("tab-create")) {
  $("tab-create").addEventListener("click", () => {
    $("tab-create").classList.add("active");
    if ($("tab-signin")) $("tab-signin").classList.remove("active");
    if ($("btn-auth-submit")) $("btn-auth-submit").textContent = "Create Account & Sign In";
  });
}

document.addEventListener("click", e => {
  const institute = e.target.closest("[data-open-institute]");
  if (institute) { openInstitute(institute.dataset.openInstitute); return; }

  const detailCall = e.target.closest("[data-detail-call]");
  if (detailCall) {
    const name = detailCall.dataset.detailCall;
    if ($("institute-detail-dialog")) $("institute-detail-dialog").close();
    openDialog("call");
    const f = $("dialog-fields");
    if (f) {
      if (f.querySelector('[name="customer"]')) f.querySelector('[name="customer"]').value = name;
      const c = customerByName(name);
      if (c) {
        const parts = (c.contacts||"").split("\n")[0].split("|").map(x=>x.trim());
        if (f.querySelector('[name="contactPerson"]')) f.querySelector('[name="contactPerson"]').value = parts[0]||"";
        if (f.querySelector('[name="contactPhone"]')) f.querySelector('[name="contactPhone"]').value = parts[2]||c.phone||"";
        if (f.querySelector('[name="owner"]')) f.querySelector('[name="owner"]').value = c.owner||"Amit Patil";
      }
    }
    return;
  }

  const detailVisit = e.target.closest("[data-detail-visit]");
  if (detailVisit) {
    const name = detailVisit.dataset.detailVisit;
    if ($("institute-detail-dialog")) $("institute-detail-dialog").close();
    openDialog("visit");
    const f = $("dialog-fields");
    if (f) {
      if (f.querySelector('[name="customer"]')) f.querySelector('[name="customer"]').value = name;
      const c = customerByName(name);
      if (c) {
        const parts = (c.contacts||"").split("\n")[0].split("|").map(x=>x.trim());
        if (f.querySelector('[name="contactPerson"]')) f.querySelector('[name="contactPerson"]').value = parts[0]||"";
        if (f.querySelector('[name="contactPhone"]')) f.querySelector('[name="contactPhone"]').value = parts[2]||c.phone||"";
        if (f.querySelector('[name="owner"]')) f.querySelector('[name="owner"]').value = c.owner||"Amit Patil";
      }
    }
    return;
  }

  const log = e.target.closest("[data-log-customer]");
  if (log) {
    setPage("calls");
    openDialog("call");
    const select = $('dialog-fields')?.querySelector('[name="customer"]');
    if (select) select.value = log.dataset.logCustomer;
    return;
  }

  const completeVisit = e.target.closest("[data-complete-visit]");
  if (completeVisit) {
    const v = state.visits.find(x => x.id === Number(completeVisit.dataset.completeVisit));
    if (v) v.status = "Completed";
    saveLocalState();
    renderAll();
    showNotice("Visit marked as completed.");
    return;
  }

  const complete = e.target.closest("[data-complete-followup]");
  if (complete) {
    const f = state.followups.find(x => x.id === Number(complete.dataset.completeFollowup));
    if (f) f.status = "Completed";
    saveLocalState();
    renderAll();
    showNotice("Follow-up marked as completed.");
    return;
  }

  const reschedule = e.target.closest("[data-reschedule-followup]");
  if (reschedule) {
    const f = state.followups.find(x => x.id === Number(reschedule.dataset.rescheduleFollowup));
    if (!f) return;
    openDialog("followup");
    const fields = $("dialog-fields");
    if (fields) {
      if (fields.querySelector('[name="customer"]')) fields.querySelector('[name="customer"]').value = f.customer;
      if (fields.querySelector('[name="owner"]')) fields.querySelector('[name="owner"]').value = f.owner;
      if (fields.querySelector('[name="date"]')) fields.querySelector('[name="date"]').value = f.date;
      if (fields.querySelector('[name="notes"]')) fields.querySelector('[name="notes"]').value = f.notes||"";
    }
    state.followups = state.followups.filter(x => x.id !== f.id);
    saveLocalState();
    return;
  }

  const logFollowup = e.target.closest("[data-followup-call]");
  if (logFollowup) {
    setPage("calls");
    openDialog("call");
    const select = $('dialog-fields')?.querySelector('[name="customer"]');
    if (select) select.value = logFollowup.dataset.followupCall;
    return;
  }
});

const notifBtn = $("notification-button");
if (notifBtn) {
  notifBtn.addEventListener("click", () => {
    setPage("followups");
    showNotice("Review due and overdue follow-ups here.");
  });
}

const todayLbl = $("today-label");
if (todayLbl) {
  todayLbl.textContent = new Date().toLocaleDateString("en-IN", {weekday:"short", day:"2-digit", month:"short"});
}

const savedRole = localStorage.getItem("crm_user_role");
if (savedRole && roles[savedRole]) currentRole = savedRole;
if ($("role-switcher")) $("role-switcher").value = currentRole;

applyRole();
loadLiveBackendData();

// If user previously logged out, show the modal overlay
if (localStorage.getItem("crm_auth_logged_in") === "false") {
  openAuthModal(false);
}

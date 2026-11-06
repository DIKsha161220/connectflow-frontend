
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  LayoutDashboard,
  Users,
  Phone,
  MapPin,
  Clock,
  RefreshCw,
  AlertCircle,
} from "lucide-react";
import "./App.css";

const API = axios.create({
  baseURL: "http://localhost:8080/api",
});

const modules = [
  { name: "Dashboard", icon: LayoutDashboard },
  { name: "Employees", icon: Users, endpoint: "employees" },
  { name: "Institutes", icon: Users, endpoint: "institutes" },
  { name: "Call Logs", icon: Phone, endpoint: "calls" },
  { name: "Visits", icon: MapPin, endpoint: "visits" },
  { name: "Follow-ups", icon: Clock, endpoint: "followups" },
];

export default function App() {
  const [active, setActive] = useState("Dashboard");

  const [summary, setSummary] = useState({
    totalEmployees: 0,
    totalInstitutes: 0,
    totalFollowUps: 0,
    totalVisits: 0,
  });

  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const currentModule = modules.find((item) => item.name === active);
  const endpoint = currentModule?.endpoint;

  async function loadData() {
    setLoading(true);
    setError("");

    try {
      if (endpoint) {
        const response = await API.get(`/${endpoint}`);
        setRows(Array.isArray(response.data) ? response.data : []);
      } else {
        const response = await API.get("/dashboard/summary");

        setSummary({
          totalEmployees: response.data.totalEmployees ?? 0,
          totalInstitutes: response.data.totalInstitutes ?? 0,
          totalFollowUps: response.data.totalFollowUps ?? 0,
          totalVisits: response.data.totalVisits ?? 0,
        });
      }
    } catch (err) {
      console.error(
        "API Error:",
        err.response?.data || err.message
      );

      setError(
        `Backend API error: ${err.response?.status || err.message}`
      );

      setRows([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, [active]);

  const cards = [
    {
      title: "Total Employees",
      value: summary.totalEmployees,
      icon: Users,
    },
    {
      title: "Total Institutes",
      value: summary.totalInstitutes,
      icon: LayoutDashboard,
    },
    {
      title: "Total Visits",
      value: summary.totalVisits,
      icon: MapPin,
    },
    {
      title: "Total Follow-ups",
      value: summary.totalFollowUps,
      icon: Clock,
    },
  ];

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-icon">C</div>
          <div>
            <strong>ConnectFlow</strong>
            <small>CRM WORKSPACE</small>
          </div>
        </div>

        <p className="menu-heading">WORKSPACE</p>

        <nav>
          {modules.map((item) => {
            const Icon = item.icon;

            return (
              <button
                key={item.name}
                className={`nav-item ${
                  active === item.name ? "active" : ""
                }`}
                onClick={() => setActive(item.name)}
              >
                <Icon size={19} />
                <span>{item.name}</span>
              </button>
            );
          })}
        </nav>

        <div className="sidebar-footer">
          <div className="avatar">AD</div>
          <div>
            <strong>Admin User</strong>
            <small>ConnectFlow CRM</small>
          </div>
        </div>
      </aside>

      <main className="main-area">
        <header className="topbar">
          <div>
            <span>Workspace</span> / <strong>{active}</strong>
          </div>

          <button className="refresh-button" onClick={loadData}>
            <RefreshCw size={16} />
            Refresh
          </button>
        </header>

        <section className="page-content">
          <p className="eyebrow">
            CUSTOMER RELATIONSHIP MANAGEMENT
          </p>

          <h1>{active}</h1>

          <p className="subtitle">
            ConnectFlow CRM — live backend data
          </p>

          {error && (
            <div className="error-message">
              <AlertCircle size={18} />
              <span>{error}</span>
            </div>
          )}

          {loading ? (
            <div className="loading">Loading data...</div>
          ) : active === "Dashboard" ? (
            <>
              <div className="cards-grid">
                {cards.map((card) => {
                  const Icon = card.icon;

                  return (
                    <article
                      className="stat-card"
                      key={card.title}
                    >
                      <div className="stat-card-header">
                        <span>{card.title}</span>

                        <span className="stat-icon">
                          <Icon size={21} />
                        </span>
                      </div>

                      <h2>{card.value}</h2>

                      <small>From Spring Boot API</small>
                    </article>
                  );
                })}
              </div>

              <section className="data-panel">
                <h2>Backend Connection</h2>

                <p>
                  Dashboard data is loaded from
                  <code> /api/dashboard/summary </code>.
                </p>

                <button
                  className="primary-button"
                  onClick={loadData}
                >
                  Refresh Dashboard
                </button>
              </section>
            </>
          ) : (
            <section className="data-panel">
              <div className="panel-heading">
                <h2>{active} Records</h2>
                <span>{rows.length} records</span>
              </div>

              {rows.length === 0 ? (
                <p className="empty-message">
                
                </p>
              ) : (
                <div className="table-wrapper">
                  <table>
                    <thead>
                      <tr>
                        {Object.keys(rows[0]).map((key) => (
                          <th key={key}>{key}</th>
                        ))}
                      </tr>
                    </thead>

                    <tbody>
                      {rows.map((row, index) => (
                        <tr
                          key={
                            row.employeeId ??
                            row.instituteId ??
                            row.id ??
                            index
                          }
                        >
                          {Object.keys(rows[0]).map((key) => (
                            <td key={key}>
                              {row[key] === null ||
                              row[key] === undefined
                                ? "—"
                                : typeof row[key] === "object"
                                ? JSON.stringify(row[key])
                                : String(row[key])}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </section>
          )}
        </section>
      </main>
    </div>
  );
}


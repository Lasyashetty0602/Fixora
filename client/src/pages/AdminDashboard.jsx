import { useState } from "react";
import "./AdminDashboard.css";

const initialIssues = [
  {
    id: "FX-101",
    title: "Water leakage in bathroom",
    category: "Plumbing",
    priority: "High",
    status: "Pending",
    reportedBy: "Resident 1",
  },
  {
    id: "FX-102",
    title: "Corridor light not working",
    category: "Electrical",
    priority: "Medium",
    status: "In Progress",
    reportedBy: "Resident 2",
  },
  {
    id: "FX-103",
    title: "Lift maintenance required",
    category: "Lift",
    priority: "High",
    status: "Pending",
    reportedBy: "Resident 3",
  },
  {
    id: "FX-104",
    title: "Common area cleaning",
    category: "Cleaning",
    priority: "Low",
    status: "Resolved",
    reportedBy: "Resident 4",
  },
  {
    id: "FX-105",
    title: "Broken entrance door lock",
    category: "Security",
    priority: "High",
    status: "In Progress",
    reportedBy: "Resident 5",
  },
];

function AdminDashboard() {
  const [issues, setIssues] = useState(initialIssues);
  const [filter, setFilter] = useState("All");
  const [selectedIssue, setSelectedIssue] = useState(null);

  const totalIssues = issues.length;

  const pendingIssues = issues.filter(
    (issue) => issue.status === "Pending"
  ).length;

  const inProgressIssues = issues.filter(
    (issue) => issue.status === "In Progress"
  ).length;

  const resolvedIssues = issues.filter(
    (issue) => issue.status === "Resolved"
  ).length;

  const filteredIssues =
    filter === "All"
      ? issues
      : issues.filter((issue) => issue.status === filter);

  function updateStatus(id, newStatus) {
    setIssues((currentIssues) =>
      currentIssues.map((issue) =>
        issue.id === id
          ? { ...issue, status: newStatus }
          : issue
      )
    );

    // Keep the popup updated if this issue is open.
    setSelectedIssue((currentIssue) =>
      currentIssue && currentIssue.id === id
        ? { ...currentIssue, status: newStatus }
        : currentIssue
    );
  }

  return (
    <main className="admin-page">
      <div className="admin-container">
        <section className="admin-welcome">
          <div>
            <p className="admin-eyebrow">FIXORA MANAGEMENT</p>
            <h1>Admin Dashboard</h1>
            <p>
              Monitor building issues and keep maintenance work organized.
            </p>
          </div>

          <div className="admin-welcome-icon">🏢</div>
        </section>

        {/* Dashboard count cards */}
        <section className="admin-stats">
          <article className="admin-stat-card">
            <div className="admin-stat-icon total-icon">📋</div>
            <p>Total Issues</p>
            <h2>{totalIssues}</h2>
          </article>

          <article className="admin-stat-card">
            <div className="admin-stat-icon pending-icon">⏳</div>
            <p>Pending</p>
            <h2>{pendingIssues}</h2>
          </article>

          <article className="admin-stat-card">
            <div className="admin-stat-icon progress-icon">🔧</div>
            <p>In Progress</p>
            <h2>{inProgressIssues}</h2>
          </article>

          <article className="admin-stat-card">
            <div className="admin-stat-icon resolved-icon">✅</div>
            <p>Resolved</p>
            <h2>{resolvedIssues}</h2>
          </article>
        </section>

        {/* Maintenance requests */}
        <section className="admin-issues-section">
          <div className="admin-issues-heading">
            <div>
              <h2>Maintenance Requests</h2>
              <p>Review and update reported building issues.</p>
            </div>

            <select
              className="admin-filter"
              value={filter}
              onChange={(event) => setFilter(event.target.value)}
              aria-label="Filter issues by status"
            >
              <option value="All">All Issues</option>
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
            </select>
          </div>

          <div className="admin-table-wrapper">
            <table className="admin-issues-table">
              <thead>
                <tr>
                  <th>Issue</th>
                  <th>Category</th>
                  <th>Priority</th>
                  <th>Status</th>
                  <th>Update Status</th>
                  <th>Details</th>
                </tr>
              </thead>

              <tbody>
                {filteredIssues.map((issue) => (
                  <tr key={issue.id}>
                    <td>
                      <strong>{issue.title}</strong>
                      <span className="admin-issue-id">
                        {issue.id}
                      </span>
                    </td>

                    <td>{issue.category}</td>

                    <td>
                      <span
                        className={`admin-priority priority-${issue.priority.toLowerCase()}`}
                      >
                        {issue.priority}
                      </span>
                    </td>

                    <td>
                      <span
                        className={`admin-status status-${issue.status
                          .toLowerCase()
                          .replace(" ", "-")}`}
                      >
                        {issue.status}
                      </span>
                    </td>

                    <td>
                      <select
                        className="admin-status-select"
                        value={issue.status}
                        onChange={(event) =>
                          updateStatus(issue.id, event.target.value)
                        }
                        aria-label={`Update status for ${issue.id}`}
                      >
                        <option value="Pending">Pending</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Resolved">Resolved</option>
                      </select>
                    </td>

                    <td>
                      <button
                        type="button"
                        className="admin-view-button"
                        onClick={() => setSelectedIssue(issue)}
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}

                {filteredIssues.length === 0 && (
                  <tr>
                    <td colSpan="6" className="admin-empty">
                      No requests found for this status.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <p className="admin-demo-note">
            Demo data only — changes are temporary and reset when
            this page reloads. Real requests will be connected to
            MongoDB later.
          </p>
        </section>
      </div>

      {/* Issue details popup */}
      {selectedIssue && (
        <div
          className="admin-modal-overlay"
          onClick={() => setSelectedIssue(null)}
        >
          <section
            className="admin-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="admin-modal-title"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="admin-modal-heading">
              <div>
                <p className="admin-eyebrow">ISSUE DETAILS</p>
                <h2 id="admin-modal-title">
                  {selectedIssue.title}
                </h2>
                <span className="admin-issue-id">
                  Request ID: {selectedIssue.id}
                </span>
              </div>

              <button
                type="button"
                className="admin-modal-close"
                onClick={() => setSelectedIssue(null)}
                aria-label="Close issue details"
              >
                ×
              </button>
            </div>

            <div className="admin-modal-details">
              <div className="admin-detail-row">
                <span>Category</span>
                <strong>{selectedIssue.category}</strong>
              </div>

              <div className="admin-detail-row">
                <span>Priority</span>
                <span
                  className={`admin-priority priority-${selectedIssue.priority.toLowerCase()}`}
                >
                  {selectedIssue.priority}
                </span>
              </div>

              <div className="admin-detail-row">
                <span>Current Status</span>
                <span
                  className={`admin-status status-${selectedIssue.status
                    .toLowerCase()
                    .replace(" ", "-")}`}
                >
                  {selectedIssue.status}
                </span>
              </div>

              <div className="admin-detail-row">
                <span>Reported By</span>
                <strong>{selectedIssue.reportedBy}</strong>
              </div>
            </div>

            <div className="admin-modal-actions">
              <button
                type="button"
                className="admin-modal-close-button"
                onClick={() => setSelectedIssue(null)}
              >
                Close
              </button>
            </div>
          </section>
        </div>
      )}
    </main>
  );
}

export default AdminDashboard;
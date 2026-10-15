import { useState } from "react";
import "./MyRequests.css";

const sampleRequests = [
  {
    id: 1,
    title: "Water leakage in bathroom",
    category: "Plumbing",
    location: "Block A, Room 204",
    priority: "High",
    status: "In Progress",
    date: "14 Oct 2026",
    description: "Water is leaking from the bathroom pipe.",
  },
  {
    id: 2,
    title: "Light not working",
    category: "Electrical",
    location: "Block B, Room 102",
    priority: "Medium",
    status: "Pending",
    date: "13 Oct 2026",
    description: "The ceiling light is not working.",
  },
  {
    id: 3,
    title: "Corridor cleaning",
    category: "Cleaning",
    location: "Block A, First Floor",
    priority: "Low",
    status: "Resolved",
    date: "12 Oct 2026",
    description: "The corridor needed cleaning.",
  },
];

function MyRequests() {
  const [requests] = useState(sampleRequests);
  const [filter, setFilter] = useState("All");
  const [selectedRequest, setSelectedRequest] = useState(null);

  const filteredRequests =
    filter === "All"
      ? requests
      : requests.filter((request) => request.status === filter);

  return (
    <main className="requests-page">
      <section className="requests-container">
        <div className="requests-heading">
          <p className="requests-eyebrow">FIXORA / MY REQUESTS</p>
          <h1>My Maintenance Requests</h1>
          <p>View your reported issues and check their progress.</p>
        </div>

        <div className="request-stats">
          <div className="request-stat">
            <span>Total Requests</span>
            <h2>{requests.length}</h2>
          </div>

          <div className="request-stat">
            <span>Pending</span>
            <h2>{requests.filter((r) => r.status === "Pending").length}</h2>
          </div>

          <div className="request-stat">
            <span>In Progress</span>
            <h2>
              {requests.filter((r) => r.status === "In Progress").length}
            </h2>
          </div>

          <div className="request-stat">
            <span>Resolved</span>
            <h2>{requests.filter((r) => r.status === "Resolved").length}</h2>
          </div>
        </div>

        <div className="requests-toolbar">
          <h2>Your Requests</h2>

          <select
            aria-label="Filter requests by status"
            value={filter}
            onChange={(event) => setFilter(event.target.value)}
          >
            <option value="All">All Requests</option>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Resolved">Resolved</option>
          </select>
        </div>

        <div className="requests-list">
          {filteredRequests.length === 0 ? (
            <div className="requests-empty">
              <h3>No requests found</h3>
              <p>There are no requests with this status.</p>
            </div>
          ) : (
            filteredRequests.map((request) => (
              <article className="request-card" key={request.id}>
                <div className="request-card-top">
                  <div>
                    <span className="request-category">
                      {request.category}
                    </span>
                    <h3>{request.title}</h3>
                    <p className="request-location">{request.location}</p>
                  </div>

                  <span
                    className={`request-status ${request.status
                      .toLowerCase()
                      .replace(" ", "-")}`}
                  >
                    {request.status}
                  </span>
                </div>

                <div className="request-card-bottom">
                  <span>
                    Priority: <strong>{request.priority}</strong>
                  </span>
                  <span>Reported: {request.date}</span>

                  <button
                    type="button"
                    className="request-details-button"
                    onClick={() => setSelectedRequest(request)}
                  >
                    View Details
                  </button>
                </div>
              </article>
            ))
          )}
        </div>

        {selectedRequest && (
          <div
            className="request-modal-backdrop"
            onClick={() => setSelectedRequest(null)}
          >
            <section
              className="request-modal"
              role="dialog"
              aria-modal="true"
              aria-labelledby="request-modal-title"
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                className="request-modal-close"
                onClick={() => setSelectedRequest(null)}
                aria-label="Close details"
              >
                ×
              </button>

              <p className="requests-eyebrow">REQUEST DETAILS</p>
              <h2 id="request-modal-title">{selectedRequest.title}</h2>

              <p>
                <strong>Category:</strong> {selectedRequest.category}
              </p>
              <p>
                <strong>Location:</strong> {selectedRequest.location}
              </p>
              <p>
                <strong>Priority:</strong> {selectedRequest.priority}
              </p>
              <p>
                <strong>Status:</strong> {selectedRequest.status}
              </p>
              <p>
                <strong>Reported date:</strong> {selectedRequest.date}
              </p>
              <p>
                <strong>Description:</strong> {selectedRequest.description}
              </p>
            </section>
          </div>
        )}
      </section>
    </main>
  );
}

export default MyRequests;
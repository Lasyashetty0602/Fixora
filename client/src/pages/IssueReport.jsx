import { useState } from "react";
import "./IssueReport.css";

const initialForm = {
  name: "",
  email: "",
  location: "",
  category: "",
  priority: "Medium",
  description: "",
};

function IssueReport() {
  const [form, setForm] = useState(initialForm);
  const [photo, setPhoto] = useState(null);
  const [message, setMessage] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));

    setMessage("");
  }

  function handleSubmit(event) {
    event.preventDefault();

    setMessage(
      "Form validated successfully. Backend submission will be added later."
    );

    console.log("Issue report preview:", {
      ...form,
      photoName: photo?.name || null,
    });
  }

  function handleReset() {
    setForm(initialForm);
    setPhoto(null);
    setMessage("");
  }

  return (
    <main className="issue-page" id="report">
      <section className="issue-heading">
        <p className="issue-eyebrow">FIXORA MAINTENANCE</p>
        <h1>Report an Issue</h1>
        <p>
          Tell us what needs attention so your maintenance request
          can be reviewed.
        </p>
      </section>

      <form className="issue-form" onSubmit={handleSubmit}>
        <div className="issue-form-heading">
          <h2>Issue Details</h2>
          <p>Fields marked * are required.</p>
        </div>

        <div className="issue-form-grid">
          <div className="issue-field">
            <label htmlFor="name">Full Name *</label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Enter your full name"
              value={form.name}
              onChange={handleChange}
              autoComplete="name"
              required
            />
          </div>

          <div className="issue-field">
            <label htmlFor="email">Email Address *</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange}
              autoComplete="email"
              required
            />
          </div>

          <div className="issue-field">
            <label htmlFor="location">Building / Room Location *</label>
            <input
              id="location"
              name="location"
              type="text"
              placeholder="e.g. Block A, Room 102"
              value={form.location}
              onChange={handleChange}
              required
            />
          </div>

          <div className="issue-field">
            <label htmlFor="category">Issue Category *</label>
            <select
              id="category"
              name="category"
              value={form.category}
              onChange={handleChange}
              required
            >
              <option value="">Select a category</option>
              <option value="Electrical">Electrical</option>
              <option value="Plumbing">Plumbing</option>
              <option value="Cleaning">Cleaning</option>
              <option value="Structural">Structural</option>
              <option value="Elevator">Elevator</option>
              <option value="Safety">Safety</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="issue-field">
            <label htmlFor="priority">Priority</label>
            <select
              id="priority"
              name="priority"
              value={form.priority}
              onChange={handleChange}
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
              <option value="Urgent">Urgent</option>
            </select>
          </div>

          <div className="issue-field issue-full-width">
            <label htmlFor="description">Issue Description *</label>
            <textarea
              id="description"
              name="description"
              placeholder="Describe the problem and where it occurs..."
              value={form.description}
              onChange={handleChange}
              rows={5}
              maxLength={1000}
              required
            />
            <span className="issue-character-count">
              {form.description.length}/1000 characters
            </span>
          </div>

          <div className="issue-field issue-full-width">
            <label htmlFor="photo">Attach a Photo (Optional)</label>
            <input
              id="photo"
              type="file"
              accept="image/png,image/jpeg,image/webp"
              onChange={(event) => {
                const selectedFile = event.target.files?.[0] || null;

                if (selectedFile && selectedFile.size > 5 * 1024 * 1024) {
                  setPhoto(null);
                  event.target.value = "";
                  setMessage("Please select an image smaller than 5 MB.");
                  return;
                }

                setPhoto(selectedFile);
                setMessage("");
              }}
            />
            <span className="issue-help">
              Images only. Maximum file size: 5 MB.
            </span>

            {photo && (
              <p className="issue-file-name">
                Selected file: {photo.name}
              </p>
            )}
          </div>
        </div>

        {message && (
          <p className="issue-feedback" role="status">
            {message}
          </p>
        )}

        <div className="issue-actions">
          <button className="issue-submit" type="submit">
            Submit Report
          </button>
          

          <button
            className="issue-reset"
            type="button"
            onClick={handleReset}
          >
            Clear Form
          </button>
        </div>
      </form>
    </main>
  );
}

export default IssueReport;
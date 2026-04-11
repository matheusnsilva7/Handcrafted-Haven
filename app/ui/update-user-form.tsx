"use client";
import { updateUser, deleteUser } from "@/app/lib/actions";

export default function ProfilePage({ user }: any) {

  async function handleUpdateUser(formData: FormData) {
    await updateUser(formData);
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f5f5f5",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
      }}
    >
      <div
        style={{
          width: "420px",
          display: "grid",
          gap: "20px",
        }}
      >
        <form
          action={handleUpdateUser}
          style={{
            background: "white",
            padding: "30px",
            borderRadius: "12px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
          }}
        >
          <h1 style={{ marginBottom: "20px", textAlign: "center" }}>
            Update Profile
          </h1>

          <input type="hidden" name="id" value={String(user.id)} />

          <div style={{ marginBottom: "15px" }}>
            <label>Name</label>
            <input
              type="text"
              name="name"
              defaultValue={String(user.name)}
              style={{
                width: "100%",
                padding: "10px",
                marginTop: "5px",
                borderRadius: "8px",
                border: "1px solid #ccc",
              }}
            />
          </div>

          <div style={{ marginBottom: "15px" }}>
            <label>Email</label>
            <input
              type="email"
              name="email"
              defaultValue={String(user.email)}
              style={{
                width: "100%",
                padding: "10px",
                marginTop: "5px",
                borderRadius: "8px",
                border: "1px solid #ccc",
              }}
            />
          </div>

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "12px",
              border: "none",
              borderRadius: "8px",
              background: "#111",
              color: "white",
              cursor: "pointer",
            }}
          >
            Save Changes
          </button>
        </form>
        <form
          action={deleteUser}
          style={{
            background: "white",
            padding: "25px",
            borderRadius: "12px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
          }}
        >
          <h3 style={{ marginTop: 0, color: "#b91c1c" }}>Danger Zone</h3>

          <p style={{ color: "#666", fontSize: "14px" }}>
            This action will permanently delete your account.
          </p>

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "12px",
              border: "none",
              borderRadius: "8px",
              background: "#dc2626",
              color: "white",
              cursor: "pointer",
            }}
          >
            Delete Account
          </button>
        </form>
      </div>
    </div>
  );
}

export const sendEmail = () => {
  const form = document.getElementById("contactForm") as HTMLFormElement;

  form?.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(form);

    const data = Object.fromEntries(formData.entries());

    const res = await fetch("/api/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      alert("Mensaje enviado correctamente");
      form.reset();
    } else {
      alert("Hubo un error");
    }
  });
};

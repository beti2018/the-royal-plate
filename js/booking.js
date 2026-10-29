
"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("reservationForm");
  const dateInput = document.getElementById("bookingDate");
  const message = document.getElementById("bookingMessage");
  const currentYear = document.getElementById("currentYear");

  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }

  if (!form || !dateInput || !message) {
    return;
  }

  // Format today's date using the visitor's local time.
  function getLocalDateString() {
    const now = new Date();

    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }

  // Prevent selecting a date in the past.
  dateInput.min = getLocalDateString();

  function addResultText(parent, tagName, textContent, className) {
    const element = document.createElement(tagName);

    element.textContent = textContent;

    if (className) {
      element.className = className;
    }

    parent.appendChild(element);
    return element;
  }

  function displayError(text) {
    message.replaceChildren();

    addResultText(message, "h3", "Please Check Your Details");
    addResultText(message, "p", text);

    message.hidden = false;
    message.scrollIntoView({
      behavior: "smooth",
      block: "nearest"
    });
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    // Let the browser handle required fields and email validation.
    if (!form.reportValidity()) {
      return;
    }

    // Check the date again when the form is submitted.
    if (dateInput.value < getLocalDateString()) {
      displayError("Please choose today or a future date.");
      dateInput.focus();
      return;
    }

    const guestName = document
      .getElementById("guestName")
      .value
      .trim();

    const guestEmail = document
      .getElementById("guestEmail")
      .value
      .trim();

    const guestPhone = document
      .getElementById("guestPhone")
      .value
      .trim();

    const guestCount = document.getElementById("guestCount").value;
    const bookingDate = dateInput.value;
    const bookingTime = document.getElementById("bookingTime").value;
    const occasion = document.getElementById("occasion").value;

    const specialRequests = document
      .getElementById("specialRequests")
      .value
      .trim();

    if (!guestName || !guestEmail || !guestPhone) {
      displayError("Please complete your name and contact information.");
      return;
    }

    // Use local midday to avoid date changes caused by time zones.
    const dateParts = bookingDate.split("-").map(Number);

    const readableDate = new Date(
      dateParts[0],
      dateParts[1] - 1,
      dateParts[2],
      12
    ).toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric"
    });

    const [hours, minutes] = bookingTime.split(":").map(Number);

    const readableTime = new Date(
      2000,
      0,
      1,
      hours,
      minutes
    ).toLocaleTimeString(undefined, {
      hour: "numeric",
      minute: "2-digit"
    });

    // Build the result using textContent to safely display user input.
    message.replaceChildren();

    addResultText(message, "h3", "Your Reservation Details");

    addResultText(message, "p", `Name: ${guestName}`);
    addResultText(message, "p", `Email: ${guestEmail}`);
    addResultText(message, "p", `Phone: ${guestPhone}`);
    addResultText(message, "p", `Guests: ${guestCount}`);
    addResultText(message, "p", `Date: ${readableDate}`);
    addResultText(message, "p", `Preferred time: ${readableTime}`);
    addResultText(message, "p", `Occasion: ${occasion}`);

    if (specialRequests) {
      addResultText(
        message,
        "p",
        `Special requests: ${specialRequests}`
      );
    }

    addResultText(
      message,
      "p",
      "DEMO ONLY: These details have not been sent to the restaurant. " +
      "Your table is not booked or confirmed. A backend or reservation " +
      "service must be connected to receive real booking requests.",
      "result-warning"
    );

    message.hidden = false;

    message.scrollIntoView({
      behavior: "smooth",
      block: "nearest"
    });
  });
});

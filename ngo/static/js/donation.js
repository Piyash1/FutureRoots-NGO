const amountInput = document.getElementById("amountInput");
const amountButtons = document.querySelectorAll(".amount-options button");
const giftBoxes = document.querySelectorAll(".gift-box");

let selectedAmount = 2500; // default selected

function updateAmountInput() {
  let giftTotal = 0;
  giftBoxes.forEach(box => {
    if (box.classList.contains("selected")) {
      const price = parseInt(box.dataset.price);
      const qty = parseInt(box.querySelector(".gift-qty").value);
      giftTotal += price * qty;
    }
  });

  if (selectedAmount !== "custom") {
    amountInput.value = selectedAmount + giftTotal;
  } else {
    if (!amountInput.hasAttribute("readonly")) {
      let manualValue = parseInt(amountInput.value) || 0;
      amountInput.value = manualValue + giftTotal;
    }
  }
}

amountButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    amountButtons.forEach(b => b.classList.remove("selected"));
    btn.classList.add("selected");

    const amt = btn.dataset.amount;
    selectedAmount = amt === "custom" ? "custom" : parseInt(amt);
    if (selectedAmount === "custom") {
      amountInput.removeAttribute("readonly");
      amountInput.value = "";
    } else {
      amountInput.setAttribute("readonly", true);
    }
    updateAmountInput();
  });
});

giftBoxes.forEach(box => {
  const qtyInput = box.querySelector(".gift-qty");

  box.addEventListener("click", (e) => {
    if (!e.target.classList.contains("gift-qty")) {
      box.classList.toggle("selected");
      updateAmountInput();
    }
  });

  qtyInput.addEventListener("input", () => {
    updateAmountInput();
  });
});

updateAmountInput();


// 🔽 NEW: Handle popup show on "Donate Now"
document.getElementById("donateNowBtn").addEventListener("click", () => {
  const popup = document.getElementById("donationPopup");

  // Set final amount in popup
  const finalAmount = parseInt(amountInput.value) || 0;
  document.getElementById("popupAmount").innerText = finalAmount;
  document.getElementById("formAmount").value = finalAmount;

  popup.style.display = "flex";
});

// 🔽 NEW: Close popup function
function closePopup() {
  document.getElementById("donationPopup").style.display = "none";
}

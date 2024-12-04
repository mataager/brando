function updateShippingFees() {
  // Get the element containing the total amount
  const totalCartAmountElement = document.getElementById("total-cart-amount");

  // Extract the text content of the element, set to "0" if element is null
  let totalText = "0";
  if (totalCartAmountElement) {
    const h5Element = totalCartAmountElement.querySelector("h5");
    if (h5Element) {
      totalText = h5Element.innerText;
    }
  }

  // Use a regular expression to extract the numerical part
  const totalAmountString = totalText.match(/\d+/)
    ? totalText.match(/\d+/)[0]
    : "0";

  // Convert the extracted string to an integer
  const totalAmount = parseInt(totalAmountString, 10);

  // Get the city element and its value
  const cityElement = document.getElementById("city");
  let city = "Not selected yet";
  if (cityElement) {
    city = cityElement.value || "Not selected yet";
  }

  if (totalAmount < freeshipping) {
    let shippingFees = 65; // Default value for most governorates

    // Define special governorates with 100 EGP shipping fee
    const specialGovernorates = [
      "Luxor",
      "Aswan",
      "Minya",
      "Beni Suef",
      "Sohag",
      "Qena",
      "Assiut",
      "North Sinai",
      "South Sinai",
      "Matruh",
      "New Valley",
      "Red Sea",
      "Other",
    ];

    if (city === "Al-Sharqia") {
      shippingFees = 65; // Specific case for Al-Sharqia
    } else if (specialGovernorates.includes(city)) {
      shippingFees = 100; // Apply 100 EGP for special governorates and "Other"
    }

    document.getElementById("shipping-fees").innerText = shippingFees + " EGP";
    document.getElementById("shipping-fees-total").innerText =
      shippingFees + " EGP"; // Update summary shipping fees
    // Store the shipping fees in localStorage
    localStorage.setItem("shippingFees", shippingFees);
  } else {
    document.getElementById("shipping-fees").innerText = "free shipping";
    document.getElementById("shipping-fees-total").innerText = "0 EGP"; // Update summary shipping fees
    // Store the shipping fees in localStorage
    localStorage.setItem("shippingFees", "0 EGP");
  }

  // Update the cart summary
  updateCartSummary();
}

// Call the function when the page loads
document.addEventListener("DOMContentLoaded", updateShippingFees);

// Call the function when the city select changes, if the element exists
const cityElement = document.getElementById("city");
if (cityElement) {
  cityElement.addEventListener("change", updateShippingFees);
}

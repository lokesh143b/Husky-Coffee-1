"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const rewards = [
  "5% OFF",
  "10% OFF",
  "15% OFF",
  "20% OFF",
  "FREE COFFEE ☕",
  "TRY AGAIN 😅",
];

export default function DiscountSpinner() {
  const [rotation, setRotation] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const spin = () => {
  if (spinning) return;

  setSpinning(true);
  setResult(null);

  const index = Math.floor(Math.random() * rewards.length);
  const sliceAngle = 360 / rewards.length;

  const targetRotation =
    rotation +
    360 * 6 +
    (360 - index * sliceAngle - sliceAngle / 2);

  setRotation(targetRotation);

  setTimeout(() => {
    setResult(rewards[index]);
    setSpinning(false);
  }, 4000);
};


  return (
    <div className="flex flex-col items-center gap-8 text-white">

      {/* Wheel Wrapper */}
      <div className="relative w-80 h-80">

        {/* Pointer */}
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20 text-3xl">
          🔻
        </div>

        {/* Wheel */}
        <motion.div
          animate={{ rotate: rotation }}
          transition={{ duration: 4, ease: "easeOut" }}
          className="relative w-full h-full rounded-full border-[10px] border-amber-400 shadow-2xl overflow-hidden"
        >
          {rewards.map((text, i) => {
            const angle = 360 / rewards.length;
            const rotate = angle * i;

            return (
              <div
                key={i}
                className="absolute inset-0"
                style={{
                  clipPath: "polygon(50% 50%, 100% 0, 100% 100%)",
                  transform: `rotate(${rotate}deg)`,
                  backgroundColor:
                    i % 2 === 0 ? "#f59e0b" : "#fde68a",
                }}
              >
                <div
                  className="absolute top-1/2 right-6 -translate-y-1/2 text-sm font-bold text-black"
                  style={{
                    transform: `rotate(${angle / 2}deg)`,
                    width: "90px",
                    textAlign: "center",
                  }}
                >
                  {text}
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>

      {/* Button */}
      <button
        onClick={spin}
        disabled={spinning}
        className="px-10 py-3 bg-amber-400 text-black font-bold rounded-full shadow-lg hover:bg-amber-500 transition disabled:opacity-50"
      >
        {spinning ? "Spinning..." : "Spin & Win 🎉"}
      </button>

      {/* Result */}
      {result && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-xl font-semibold text-amber-400"
        >
          🎁 You won: {result}
        </motion.div>
      )}
    </div>
  );
}

// for webflow all modules page

<script>

document.addEventListener("DOMContentLoaded", function () {

  const mainTabs = document.querySelectorAll(".main-tab");
  const groups = document.querySelectorAll(".group-wrapper");

  mainTabs.forEach(tab => {
    tab.addEventListener("click", () => {
      const group = tab.getAttribute("data-group");

      // Hide all group wrappers
      groups.forEach(g => g.style.display = "none");

      // Show selected group wrapper
      const activeGroup = document.querySelector(`.group-wrapper[data-group="${group}"]`);
      if (activeGroup) activeGroup.style.display = "block";

      // Remove active class from all main tabs
      mainTabs.forEach(t => t.classList.remove("active"));

      // Add active class to clicked main tab
      tab.classList.add("active");

      // Trigger first sub-tab inside this group
      const firstSubTab = activeGroup.querySelector(".tab-link");
      if (firstSubTab) firstSubTab.click();
    });
  });

  // Show first main tab by default
  if (mainTabs.length) mainTabs[0].click();

});


document.addEventListener("DOMContentLoaded", function () {

  // Loop through each group-wrapper separately
  document.querySelectorAll(".group-wrapper").forEach(wrapper => {
    const tabs = wrapper.querySelectorAll(".tab-link");
    const contents = wrapper.querySelectorAll(".tab-content");

    tabs.forEach(tab => {
      tab.addEventListener("click", function () {
        const target = this.getAttribute("data-tab");

        // Hide only contents in this group
        contents.forEach(c => c.style.display = "none");

        // Show the clicked tab's content in this group
        const activeContent = wrapper.querySelector(`.tab-content[data-content="${target}"]`);
        if (activeContent) {
          activeContent.style.display = "block";
        }

        // Remove active class from all tabs in this group
        tabs.forEach(t => t.classList.remove("active"));
        this.classList.add("active");
      });
    });

    // Trigger first sub-tab by default for this group
    if (tabs.length) tabs[0].click();
  });

});





</script>

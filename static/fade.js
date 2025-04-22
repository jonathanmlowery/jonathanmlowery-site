document.addEventListener("DOMContentLoaded", () => {
	const fadeIns = document.querySelectorAll(".fade-in");
	const observer = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					entry.target.classList.add("visible");
					observer.unobserve(entry.target); // Stop observing once visible
				}
			});
		},
		{ threshold: 0.1 }
	); // Trigger when 10% of element is visible

	fadeIns.forEach((element) => observer.observe(element));
});

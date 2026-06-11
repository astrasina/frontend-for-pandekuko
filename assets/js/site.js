document.addEventListener("DOMContentLoaded", function () {
	const header = document.querySelector(".nav-header");
	const nav = header ? header.querySelector(".site-nav") : null;
	const navActions = header ? header.querySelector(".nav-actions") : null;
	const navMenu = nav ? nav.querySelector(".nav-menu") : null;

	if (!header || !nav || !navActions || !navMenu) {
		return;
	}

	const currentPage = (window.location.pathname.split("/").pop() || "index.html").toLowerCase();
	const navigationSections = [
		{
			label: "Our Kuko",
			items: [
				{ href: "our-kuko.html", label: "Our Kuko", pages: ["our-kuko.html"] },
				{ href: "gallery.html", label: "Catalogue", pages: ["gallery.html", "dark-and-wild.html", "x-tralicious.html", "kawaii-dazzle.html", "bloody-reds.html"] }
			]
		},
		{
			label: "Order Form",
			items: [
				{ href: "product.html", label: "Order Form", pages: ["product.html"] },
				{ href: "customize.html", label: "Customize", pages: ["customize.html"] }
			]
		},
		{
			label: "About Us",
			items: [
				{ href: "about.html", label: "About Us", pages: ["about.html"] },
				{ href: "owner.html", label: "The Owner", pages: ["owner.html"] },
				{ href: "brand.html", label: "The Brand", pages: ["brand.html"] },
				{ href: "faqs.html", label: "FAQs", pages: ["faqs.html"] },
				{ href: "feedback.html", label: "Feedback", pages: ["feedback.html", "submit-feedback.html", "view-feedback.html"] },
				{ href: "policies.html", label: "Policies", pages: ["policies.html"] }
			]
		}
	];

	navMenu.innerHTML = navigationSections.map(function (section, sectionIndex) {
		const sectionIsCurrent = section.items.some(function (item) {
			return item.pages.includes(currentPage);
		});
		const submenuId = "site-nav-submenu-" + sectionIndex;

		return [
			'<li class="nav-item nav-dropdown' + (sectionIsCurrent ? ' is-current' : '') + '">',
				'<button class="nav-dropdown-toggle' + (sectionIsCurrent ? ' is-current' : '') + '" type="button" aria-expanded="false" aria-haspopup="true" aria-controls="' + submenuId + '">',
					section.label,
					'<span class="nav-caret" aria-hidden="true"></span>',
				'</button>',
				'<ul class="nav-submenu" id="' + submenuId + '">',
					section.items.map(function (item) {
						const itemIsCurrent = item.pages.includes(currentPage);

						return '<li><a href="' + item.href + '"' + (itemIsCurrent ? ' class="is-current" aria-current="page"' : '') + '>' + item.label + '</a></li>';
					}).join(""),
				'</ul>',
			'</li>'
		].join("");
	}).join("");

	const dropdowns = Array.from(navMenu.querySelectorAll(".nav-dropdown"));

	function closeAllDropdowns(exception) {
		dropdowns.forEach(function (dropdown) {
			const isOpen = dropdown === exception;
			const button = dropdown.querySelector(".nav-dropdown-toggle");

			dropdown.classList.toggle("is-open", isOpen);

			if (button) {
				button.setAttribute("aria-expanded", String(isOpen));
			}
		});
	}

	let toggle = header.querySelector(".mobile-menu-toggle");
	if (!toggle) {
		toggle = document.createElement("button");
		toggle.className = "mobile-menu-toggle";
		toggle.type = "button";
		toggle.setAttribute("aria-expanded", "false");
		toggle.setAttribute("aria-controls", "site-primary-nav");
		toggle.setAttribute("aria-label", "Toggle navigation");
		toggle.innerHTML = "<span></span><span></span><span></span>";
		header.insertBefore(toggle, nav);
	}

	if (!nav.id) {
		nav.id = "site-primary-nav";
	}
	toggle.setAttribute("aria-controls", nav.id);

	let mobileActions = nav.querySelector(".mobile-nav-actions");
	if (!mobileActions) {
		mobileActions = document.createElement("div");
		mobileActions.className = "mobile-nav-actions";

		const login = navActions.querySelector(".login");
		const icons = navActions.querySelector(".nav-icons");

		if (login) {
			mobileActions.appendChild(login.cloneNode(true));
		}

		if (icons) {
			mobileActions.appendChild(icons.cloneNode(true));
		}

		nav.appendChild(mobileActions);
	}

	dropdowns.forEach(function (dropdown) {
		const button = dropdown.querySelector(".nav-dropdown-toggle");

		if (!button) {
			return;
		}

		button.addEventListener("click", function (event) {
			event.stopPropagation();
			const shouldOpen = !dropdown.classList.contains("is-open");
			closeAllDropdowns(shouldOpen ? dropdown : null);
		});
	});

	toggle.addEventListener("click", function () {
		const isOpen = header.classList.toggle("is-mobile-open");
		toggle.setAttribute("aria-expanded", String(isOpen));

		if (!isOpen) {
			closeAllDropdowns();
		}
	});

	document.addEventListener("click", function (event) {
		if (!nav.contains(event.target)) {
			closeAllDropdowns();
		}
	});

	document.addEventListener("keydown", function (event) {
		if (event.key === "Escape") {
			closeAllDropdowns();
		}
	});
});

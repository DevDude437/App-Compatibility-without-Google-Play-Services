function createElement(tag, attributes) {
    const element = document.createElement(tag)

    for (const [key, value] of Object.entries(attributes)) {
        element[key] = value
    }

    return element
}

function populate(apps) {
    const elements = []

    for (const app of apps) {
        const wrapper = createElement("div", { className: "app" })
        const titleWrapper = createElement("div", { className: "title" })
        const title = document.createElement("h2", {})
        title.textContent = app.name

        const badgeWrapper = createElement("span", { className: "badge" })
        const badge = createElement("code", { textContent: app.version })
        const notesWrapper = createElement("div", {})
        const notes = createElement("span", { innerHTML: `<b>NOTE:</b> <i>${app.notes}</i>` })
        const footer = createElement("div", { className: "footer" })
        const link = createElement("a", { className: "play-store-link", href: app.link, textContent: "Play Store" })

        badgeWrapper.append(badge)
        titleWrapper.append(title, badgeWrapper)
        notesWrapper.append(notes)
        footer.append(link)

        wrapper.append(titleWrapper, notesWrapper, footer)
        elements.push(wrapper)
    }

    return elements
}

function filter(input, apps) {
    const _input = input.trim().toLowerCase()

    if (_input == "") {
        return null
    }

    const filtered = []

    for (const app of apps) {
        if (app.name.toLowerCase().startsWith(_input)) {
            filtered.push(app)
        }
    }

    return filtered
}

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("apps")
        .append(...populate(APPS))

    document.getElementById("filter")
        .addEventListener("input", function () {
            filtered = filter(this.value, APPS)

            document.getElementById("apps")
                .replaceChildren()

            document.getElementById("apps")
                .append(...populate(filtered ?? APPS))
        })
})
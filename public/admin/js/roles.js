// Permissions
const tablePermissions = document.querySelector("[table-permissions");
if (tablePermissions) {
    const buttonSubmit = document.querySelector("[button-submit]");

    buttonSubmit.addEventListener("click", () => {
        let permissions = [];

        const rows = tablePermissions.querySelectorAll("[data-name]");

        rows.forEach(row => {
            const name = row.getAttribute("data-name");
            const inputs = row.querySelectorAll("input");

            if(name == "id") {
                inputs.forEach(input => {
                    const id = input.value;
                    permissions.push({
                        id: id,
                        permissions: []
                    });
                })
            } else {
                inputs.forEach((input, index) => {
                    const checked = input.checked;
                    if (checked) {
                        permissions[index].permissions.push(name);
                    }
                });
            }
        });
        console.log(permissions);
    });
}

// End Permission
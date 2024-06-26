//crear un producto
const createProductForm = document.getElementById("createProductForm");

createProductForm &&
	createProductForm.addEventListener("submit", async (event) => {
		event.preventDefault();

		const name = document.getElementById("name").value;
		const description = document.getElementById("description").value;
		const price = parseFloat(document.getElementById("price").value);
		const category = document.getElementById("category").value;
		const availability = parseInt(
			document.getElementById("availability").value
		);
		//const productImage= document.getElementById("productImage").value;

		//obtengo el ID del usuario desde el botón
		const ownerId = document
			.getElementById("createProductButton")
			.getAttribute("data-user-id");

		//const image=`public/upload/${productImage}
		const nuevoProducto = {
			name,
			description,
			price,
			category,
			availability,
			//productImage,
			owner: ownerId, //establece el ID del usuario como el valor de 'owner'
		};

		//solicitud POST al servidor para crear el producto
		try {
			const response = await fetch("/api/updateproducts", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(nuevoProducto), // Envía los datos como JSON
			});

			if (response.ok) {
				console.log("Producto creado con éxito");
				window.location.href = "/api/updateproducts";
			} else {
				console.error(
					"Error al crear el producto:",
					response.statusText
				);
			}
		} catch (error) {
			console.error("Error de red:", error);
		}
	});

//eliminar producto como administrador
document.querySelectorAll(".button-delete-product").forEach((button) => {
	button.addEventListener("click", async (event) => {
		const pid = event.target.id;

		try {
			const response = await fetch(`/api/updateproducts/${pid}`, {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
				},
			});

			if (response.ok) {
				console.log("Producto eliminado con éxito");
				location.reload();
			} else {
				console.error(
					"Error al eliminar el producto:",
					response.statusText
				);
			}
		} catch (error) {
			console.error("Error de red:", error);
		}
	});
});

//actualizar un producto
document.querySelectorAll(".button-to-update-product").forEach((button) => {
	button.addEventListener("click", moveToUpdateProduct);
});

function moveToUpdateProduct(event) {
	event.preventDefault();

	const pid = event.target.id;

	fetch(`/api/updateproducts/${pid}`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
	})
		.then((response) => {
			if (response.ok) {
				window.location.href = `/api/updateproducts/${pid}`;
			} else {
				throw new Error("Error al ir a actualizar prodcuto");
			}
		})
		.catch((error) => {
			alert(error.message);
		});
}

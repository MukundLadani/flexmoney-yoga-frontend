import React, { useState } from "react";
import "./App.css";

function App() {
	const [name, setName] = useState("");
	const [age, setAge] = useState("");
	const [batch, setBatch] = useState("");
	const [responseMessage, setResponseMessage] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			// Basic validation
			if (!name || !age || !batch) {
				throw new Error("Please provide all required information.");
			}

			// Age validation
			if (parseInt(age) < 18 || parseInt(age) > 65) {
				throw new Error("Age must be between 18 and 65.");
			}

			// Backend API call
			const response = await fetch(
				"https://flexmoney-yoga-backend-b9nz.onrender.com/api/enroll",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ name, age, batch }),
				}
			);

			if (!response.ok) {
				throw new Error(`HTTP error! Status: ${response.status}`);
			}

			const result = await response.json();
			setResponseMessage(result.message);

			// Clear form after successful submission
			setName("");
			setAge("");
			setBatch("");
		} catch (error) {
			console.error("Error during API call:", error.message);
			setResponseMessage("Error during API call. Please try again.");
		}
	};

	return (
		<div className="App">
			<h1>Yoga Classes Admission Form</h1>
			<form onSubmit={handleSubmit}>
				<div class="mb-3">
					<label for="exampleInputname" class="form-label">
						Name
					</label>
					<input
						class="form-control"
						type="text"
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
				</div>
				<div class="mb-3">
					<label for="exampleInputAge" class="form-label">
						Age
					</label>
					<input
						class="form-control"
						type="number"
						value={age}
						onChange={(e) => setAge(e.target.value)}
					/>
				</div>
				<div class="mb-3">
					<label for="exampleInputBatch" class="form-label">
						Select Batch
					</label>
					<select
						class="form-control"
						value={batch}
						onChange={(e) => setBatch(e.target.value)}
					>
						<option value="">Select Options</option>
						<option value="6-7AM">6-7AM</option>
						<option value="7-8AM">7-8AM</option>
						<option value="8-9AM">8-9AM</option>
						<option value="5-6PM">5-6PM</option>
					</select>
				</div>
				<button type="submit" class="btn btn-primary">
					Enroll
				</button>
			</form>
			<br />
			<h2 class="response">{responseMessage && <p>{responseMessage}</p>}</h2>
		</div>
	);
}

export default App;

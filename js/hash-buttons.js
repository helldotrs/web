<!--mllgen-->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dynamic Button Hashing</title>
    <script>
        // List of button names
        const buttons = ["Button One", "Button Two", "Button Three"];

        // Initialize the state variable
        let hashedState = "unhashed";

        // Simple SHA-256 hash function using SubtleCrypto API
        async function sha256(message) {
            const msgBuffer = new TextEncoder().encode(message);
            const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
            const hashArray = Array.from(new Uint8Array(hashBuffer));
            const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
            return hashHex;
        }

        // Base64 encoding function
        function base64Encode(str) {
            return btoa(unescape(encodeURIComponent(str)));
        }

        // Function to handle button click
        async function handleClick(buttonValue) {
            // Update the hashedState by appending button value and hashing
            hashedState = await sha256(hashedState + buttonValue);

            // If the state is not the original "unhashed", display the updated value
            if (hashedState !== "unhashed") {
                document.getElementById("output").innerText = "Current Hashed Value: " + hashedState;
            }
        }

        // Function to generate buttons dynamically based on the button list
        function generateButtons() {
            const container = document.getElementById('button-container');
            buttons.forEach(buttonName => {
                const buttonValue = base64Encode(buttonName);
                const button = document.createElement("button");
                button.textContent = `${buttonName} (Value: ${buttonValue})`;
                button.onclick = () => handleClick(buttonValue);
                container.appendChild(button);
                container.appendChild(document.createElement("br"));
                container.appendChild(document.createElement("br"));
            });
        }

        // Call the function to generate buttons when the page loads
        window.onload = generateButtons;
    </script>
</head>
<body>
    <div id="button-container"></div>

    <!-- Output will display here if hashedState changes -->
    <p id="output"></p>
</body>
</html>

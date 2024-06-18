const addRecipeBtn = document.getElementById('addRecipeBtn');
const recipeContainer = document.getElementById('recipeContainer');
const recipeModal = document.getElementById('recipeModal');
const closeBtn = document.querySelector('.close');
const recipeForm = document.getElementById('recipeForm');
const saveRecipeBtn = document.getElementById('saveRecipeBtn');
const modalTitle = document.getElementById('modalTitle');
const recipeNameInput = document.getElementById('recipeName');
const recipeIngredientsInput = document.getElementById('recipeIngredients');
const recipeInstructionsInput = document.getElementById('recipeInstructions');

// Array to store recipes (in real-world scenario, you'd use localStorage or IndexedDB for persistence)
let recipes = [];

// Function to render recipes
function renderRecipes() {
    recipeContainer.innerHTML = '';
    recipes.forEach((recipe, index) => {
        const recipeCard = document.createElement('div');
        recipeCard.classList.add('recipe-card');
        recipeCard.innerHTML = `
            <h2>${recipe.name}</h2>
            <p><strong>Ingredients:</strong> ${recipe.ingredients}</p>
            <p><strong>Instructions:</strong> ${recipe.instructions}</p>
            <button onclick="editRecipe(${index})">Edit</button>
            <button onclick="deleteRecipe(${index})">Delete</button>
        `;
        recipeContainer.appendChild(recipeCard);
    });
}

// Function to open the modal for adding/editing recipes
function openModal() {
    modalTitle.textContent = 'Add Recipe';
    recipeNameInput.value = '';
    recipeIngredientsInput.value = '';
    recipeInstructionsInput.value = '';
    recipeModal.style.display = 'block';
}

// Function to close the modal
function closeModal() {
    recipeModal.style.display = 'none';
}

// Event listeners
addRecipeBtn.addEventListener('click', openModal);
closeBtn.addEventListener('click', closeModal);
recipeForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const name = recipeNameInput.value.trim();
    const ingredients = recipeIngredientsInput.value.trim();
    const instructions = recipeInstructionsInput.value.trim();

    if (name && ingredients && instructions) {
        const recipe = {
            name,
            ingredients,
            instructions
        };

        recipes.push(recipe);
        renderRecipes();
        closeModal();
    } else {
        alert('Please fill out all fields.');
    }
});

// Function to edit recipe
function editRecipe(index) {
    modalTitle.textContent = 'Edit Recipe';
    recipeNameInput.value = recipes[index].name;
    recipeIngredientsInput.value = recipes[index].ingredients;
    recipeInstructionsInput.value = recipes[index].instructions;
    recipeModal.style.display = 'block';

    // Save edited recipe
    saveRecipeBtn.onclick = function() {
        const name = recipeNameInput.value.trim();
        const ingredients = recipeIngredientsInput.value.trim();
        const instructions = recipeInstructionsInput.value.trim();

        if (name && ingredients && instructions) {
            recipes[index] = {
                name,
                ingredients,
                instructions
            };
            renderRecipes();
            closeModal();
        } else {
            alert('Please fill out all fields.');
        }
    };
}
    function deleteRecipe(index) {
        recipes.splice(index, 1);
        renderRecipes();
    }
    
    // Initial rendering of recipes (if any)
    renderRecipes();
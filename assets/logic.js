document.addEventListener('DOMContentLoaded', () => {
    // Functions to open and close a modal
    function openModal($el) {
        $el.classList.add('is-active');
    }

    function closeModal($el) {
        $el.classList.remove('is-active');
    }

    function closeAllModals() {
        (document.querySelectorAll('.modal') || []).forEach(($modal) => {
            closeModal($modal);
        });
    }

    // Add a click event on buttons to open a specific modal
    (document.querySelectorAll('.js-modal-trigger') || []).forEach(($trigger) => {
        const modal = $trigger.dataset.target;
        const $target = document.getElementById(modal);

        $trigger.addEventListener('click', () => {
            openModal($target);
        });

        // Add an event listener for form submission when the "Submit" button is clicked
        if ($trigger.classList.contains('js-modal-trigger')) {
            $trigger.addEventListener('click', function(event) {
                event.preventDefault();

                // Get the selected values from the form elements
                const mealType = document.getElementById('meal-type').value;
                const timeAvailableValue = document.getElementById('time').value;
                const timeAvailable = convertTimeValue(timeAvailableValue); // Convert to formatted time string
                const allergies = document.getElementById('allergies').value;

                // Create an object to store the form data
                const formData = {
                    mealType: mealType,
                    timeAvailable: timeAvailable,
                    allergies: allergies
                };

                // Store the form data in local storage
                localStorage.setItem('formData', JSON.stringify(formData));
                console.log('Form data saved to local storage:', formData);

                // Update the modal content with the form data and question
                $target.querySelector('.modal-content').innerHTML = `
                    <p>Are these choices correct?</p>
                    <br>
                    <p>Meal Type: ${formData.mealType}</p>
                    <br>
                    <p>Time Available: ${formData.timeAvailable}</p>
                    <br>
                    <p>Allergies: ${formData.allergies}</p>
                    <br>
                    <button class="js-yes-button button is-success">Yes</button>
                    <button class="js-no-button button is-danger">No</button>
                `;

                // Open the modal to display the form data and question
                openModal($target);

                // Add event listeners for "Yes" and "No" buttons
                const yesButton = $target.querySelector('.js-yes-button');
                const noButton = $target.querySelector('.js-no-button');

                yesButton.addEventListener('click', () => {
                    // Handle "Yes" button click
                    console.log('User selected: Yes');
                    // Navigate to results.html
                    window.location.href = 'results.html';
                    closeModal($target); 
                });

                noButton.addEventListener('click', () => {
                    // Handle "No" button click
                    console.log('User selected: No');
                    // Reset to the main page
                    
                    closeModal($target); 
                });
            });
        }
    });

    function convertTimeValue(timeValue) {
        if (timeValue === 'time-low') {
            return '30 minutes';
        } else if (timeValue === 'time-med') {
            return '1 hour';
        } else if (timeValue === 'time-high') {
            return '1 and a half hours';
        } else {
            return 'Unknown';
        }
    }

    // Add a click event on various child elements to close the parent modal
    (document.querySelectorAll('.modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button') || []).forEach(($close) => {
        const $target = $close.closest('.modal');

        $close.addEventListener('click', () => {
            closeModal($target);
        });
    });

    // Add a keyboard event to close all modals
    document.addEventListener('keydown', (event) => {
        if(event.key === "Escape") {
            closeAllModals();
        }
    });

    // Check if there is saved form data in local storage and display it in the modal
    
    document.addEventListener('DOMContentLoaded', () => {
        const modalTriggerButton = document.querySelector('.js-modal-trigger');
        
        modalTriggerButton.addEventListener('click', () => {
            let savedFormData = null;
            try {
                savedFormData = JSON.parse(localStorage.getItem('formData'));
            } catch (error) {
                console.error('Error parsing form data from local storage:', error);
            }
    
            console.log('Retrieved form data from local storage:', savedFormData);
    
            if (savedFormData) {
                const modalElement = document.getElementById('modal-js-example');
                if (modalElement) {
                    const modalContent = modalElement.querySelector('.modal-content');
                    if (modalContent) {
                        modalContent.innerHTML = `
                            <p>Meal Type: ${savedFormData.mealType}</p>
                            <p>Time Available: ${savedFormData.timeAvailable}</p>
                            <p>Allergies: ${savedFormData.allergies}</p>
                        `;
                        openModal(modalElement);
                    } else {
                        console.error('.modal-content element not found in the document');
                    }
                } else {
                    console.error('Modal element with ID "modal-js-example" not found in the document');
                }
            } else {
                console.error('Form data is missing or invalid');
            }
        });
    });
});

// Recipe Cards
const recipes = [
    {   // buttered noodles
        image: 'https://www.allrecipes.com/thmb/_-fntqlbxLl8Nx3Ll5apxQFGF9Q=/0x512/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/244458-buttered-noodles-DDMFS-4x3-b9931662efa64b37883c0f73b296b124.jpg',
        title: 'Buttered Noodles',
        timeAvailable: '30 minutes',
        description: 'Buttered noodles are simple to make with your favorite pasta, butter, Parmesan cheese, salt, and pepper for a quick and easy, kid-friendly dish.',
        mealType: 'lunch',
        allergies: ['no-allergy']
    },
    {   // cinnamon rolls
        image: 'https://www.allrecipes.com/thmb/YzjutzAY_Gn9_zy71vwL_as-51s=/160x90/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/17006_ninetyminutecinnamonrolls_ddmfs_4x3_2656-80b496aac3f6446780ddbba85275f7a4.jpg',
        title: 'Cinnamon Rolls',
        timeAvailable: '1 and a half hours',
        description: 'Homemade cinnamon rolls that soft and made in 90 minutes.',
        mealType: 'breakfast',
        allergies: ['no-allergy']
    },
    {   // pizza dough
        image: 'https://www.allrecipes.com/thmb/GUEZE9ahjA7WyTBd9c6BvNImJsw=/160x90/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/20171-quick-and-easy-pizza-crust-VilmaNg-4x3-f3d3bfe73e3a47b6b65a7da6de3f213d.jpg',
        title: 'Pizza dough',
        timeAvailable: '1 hour',
        description: 'Homemade pizza dough that you can put all your favorite pizza toppings on.',
        mealType: 'dinner',
        allergies: ['no-allergy']
    },
    {   // Rueben Sandwich
        image: 'https://www.allrecipes.com/thmb/TOrR5ut3pQl60MGXyjBhqP17L3c=/160x90/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/47717-reuben-sandwich-ddmfs-hero-3x4-0624-88eae0b6357843b593b4f03f7debc7e1.jpg',
        title: 'Rueben Sandwich',
        timeAvailable: '30 minutes',
        description: 'Deli style Rueban Sandwich.',
        mealType: 'lunch',
        allergies: ['no-allergy']
    },
    {   // Quiche
        image: 'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fimages.media-allrecipes.com%2Fuserphotos%2F9171022.jpg&w=160&q=60&c=sc&poi=auto&orient=true&h=90',
        title: 'Quiche',
        timeAvailable: '1 and a half hours',
        description: 'A fluffy quiche that can add any summer vegetables to enjoy.',
        mealType: 'breakfast',
        allergies: ['no-allergy']
    },
    {   // Banana Bread
        image: 'https://www.allrecipes.com/thmb/kldqT8aA_iZIVmpUlCzC1d6J8vU=/160x90/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/AR-15747-best-ever-banana-bread-DDMFS-3x4-3da596a9438c466ca421354588825e5b.jpg',
        title: 'Banana Bread',
        timeAvailable: '1 and a half hours',
        description: 'This is a great banana bread recipe that is easy to make and tastes great.',
        mealType: 'breakfast',
        allergies: ['nut-allergy']
    },
    // Add more recipes here
];

// Functions to get form data from local storage and display recipe cards
document.addEventListener('DOMContentLoaded', () => {
    function getFormData() {
        const storedFormData = localStorage.getItem('formData');
        if (storedFormData) {
            try {
                return JSON.parse(storedFormData);
            } catch (error) {
                console.error('Error parsing form data:', error);
                return null;
            }
        } else {
            console.error('Form data not found in local storage');
            return null;
        }
    }

    // Declare formData variable before using it
    const formData = getFormData();
    console.log('Form Data:', formData);

    if (formData) {
        // Filter recipes based on form data
        const filteredRecipes = recipes.filter(recipe => {
            const allergiesMatch = formData.allergies === 'none' || recipe.allergies.includes(formData.allergies);
    
            console.log('Checking recipe:', recipe.title);
            console.log('Meal Type Match:', recipe.mealType === formData.mealType);
            console.log('Time Available Match:', recipe.timeAvailable === formData.timeAvailable);
            console.log('Allergies Form Data:', formData.allergies);
            console.log('Allergies Match:', allergiesMatch);
    
            return recipe.mealType === formData.mealType &&
                recipe.timeAvailable === formData.timeAvailable &&
                allergiesMatch;
        });
    
        console.log('Filtered Recipes:', filteredRecipes);
    
        // Check if any recipes match the filter criteria
        if (filteredRecipes.length > 0) {
            const recipeCardsSection = document.querySelector('#recipeCardsSection');
            
            // Clear any existing recipe cards
            recipeCardsSection.innerHTML = '';
    
            // Loop through filtered recipes to create recipe cards
            filteredRecipes.forEach((recipe, index) => {
                const recipeCard = document.createElement('div');
                recipeCard.classList.add('column','is-half','center');

                if(filteredRecipes.length % 2 !== 0 && index === filteredRecipes.length-1) {
                    recipeCard.classList.remove('is-half');
                }
    
                recipeCard.innerHTML = `
                    
                        <div class="card recipe-card">
                            <div class="card-image">
                                <figure class="image is-4by3">
                                    <img src="${recipe.image}" alt="${recipe.title}">
                                </figure>
                                   
                            </div>
                                <p class="title is-4" style="align-items: flex-start">${recipe.title}</p>
                                <p class="title is-5" style="align-items: flex-end">${recipe.timeAvailable}</p>
                                <p>${recipe.description}</p>
                        </div>
                `;
    
                recipeCardsSection.appendChild(recipeCard);


            });
        } else {
            console.error('No recipes match the filter criteria.');
        }
    } else {
        console.error('Form data is missing or invalid');
    }
});
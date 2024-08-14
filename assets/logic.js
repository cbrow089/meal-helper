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
                // Capitalize only the first letter of mealType
                const capitalizedMealType = formData.mealType.charAt(0).toUpperCase() + formData.mealType.slice(1).toLowerCase();

                // Update the modal content with the form data and question
                $target.querySelector('.modal-content').innerHTML = `
                    <p>Are these choices correct?</p>
                    <br>
                    <p>Meal Type: ${capitalizedMealType}</p>
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
    {  
         //Vegan Pancakes
        image: 'https://www.allrecipes.com/thmb/iM2_du3W-sOo3JU9HYLbXncfleE=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/7557121-308dbc458c1e43aea36a731647174d20.jpg',
        title: 'Vegan Pancakes',
        timeAvailable: '30 minutes',
        description: 'This vegan pancake recipe is the best of the vegan lot. The secret that these pancakes are not soggy like the other vegans ones is that it uses custard powder. This ensures the pancakes are cakelike and taste and look exactly like non-vegan pancakes.',
        mealType: 'breakfast',
        allergies: ['vegan','no-allergy'],
        link: 'https://www.allrecipes.com/recipe/80677/worlds-best-vegan-pancakes/',
    },
    {
        //Rise and Shine Parfait
        image: 'https://www.tasteofhome.com/wp-content/uploads/2018/01/Rise-and-Shine-Parfait_EXPS_BBBZ16_178121_C07_08_4b.jpg?fit=1024,1024',
        title: 'Rise and Shine Parfait',
        timeAvailable: '30 minutes',
        description: 'Start your day with a smile. This fruit, yogurt and granola parfait is so easy to make. If you like, use whatever favorite fresh fruits are in season and are looking best at the supermarket.',
        mealType: 'breakfast',
        allergies: ['nut-free','no-allergy'],
        link: 'https://www.tasteofhome.com/recipes/rise-and-shine-parfait/',
    },
    {
        //Kale Smoothie
        image: 'https://www.allrecipes.com/thmb/0V_7umTJ5zFxCdkL12F67G0BZF0=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/9100931-bb78197641e7436a9203995bba678698.jpg',
        title: 'Kale Smoothie',
        timeAvailable: '30 minutes',
        description: 'Combine kale, mango, pineapple, banana, and coconut milk for a delicious and nutritious vegan smoothie the kids will love!',
        mealType: 'breakfast',
        allergies: ['nut-free','vegan','no-allergy'],
        link: 'https://www.allrecipes.com/recipe/278625/vegan-kale-smoothie/',
    },
    {
        //Breakfast Bars
        image: 'https://www.blessthismessplease.com/wp-content/uploads/2024/01/breakfast-bars-recipe-13-of-20.jpg',
        title: 'Breakfast Bars',
        timeAvailable: '1 hour',
        description: 'Soft, chewy, and perfectly sweet, these Breakfast Bars make for an easy on-the-go breakfast snack. Featuring chewy cranberries, crunchy walnuts, and more, these breakfast bars are packed full of flavor.',
        mealType: 'breakfast',
        allergies: ['no-allergy'],
        link: 'https://www.blessthismessplease.com/breakfast-bars/',
    },  
    {   
        // cinnamon rolls
        image: 'https://www.allrecipes.com/thmb/3XihTXpkt1hxliWL9FpeH53d40o=/0x512/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/17006_ninetyminutecinnamonrolls_ddmfs_4x3_2656-80b496aac3f6446780ddbba85275f7a4.jpg',
        title: 'Cinnamon Rolls',
        timeAvailable: '1 and a half hours',
        description: 'Homemade cinnamon rolls that soft and made in 90 minutes.',
        mealType: 'breakfast',
        allergies: ['nut-free','no-allergy'],
        link: 'https://www.allrecipes.com/recipe/17006/ninety-minute-cinnamon-rolls/',
    },   
    {  
        // Quiche
        image: 'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F43%2F2022%2F12%2F11%2F2170621-summer-garden-crustless-quiche-Rock_lobster-1x1-1.jpg&q=60&c=sc&poi=auto&orient=true&h=512',
        title: 'Quiche',
        timeAvailable: '1 and a half hours',
        description: 'A fluffy quiche that can add any summer vegetables to enjoy.',
        mealType: 'breakfast',
        allergies: ['nut-free','no-allergy'],
        link: 'https://www.allrecipes.com/recipe/233141/summer-garden-crustless-quiche/',
    },  
    { 
        // Banana Bread
        image: 'https://www.allrecipes.com/thmb/oN2xnk0ru_fmsXyO1rAg79DimLU=/0x512/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/AR-15747-best-ever-banana-bread-DDMFS-3x4-3da596a9438c466ca421354588825e5b.jpg',
        title: 'Banana Bread',
        timeAvailable: '1 and a half hours',
        description: 'This is a great banana bread recipe that is easy to make and tastes great.',
        mealType: 'breakfast',
        allergies: ['no-allergy'],
        link: 'https://www.allrecipes.com/recipe/15747/best-ever-banana-bread/',
    },
    {   // Rueben Sandwich
        image: 'https://www.allrecipes.com/thmb/sKoeSuJsr2A47e-q0P5bVqGDTzg=/0x512/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/47717-reuben-sandwich-ddmfs-hero-3x4-0624-88eae0b6357843b593b4f03f7debc7e1.jpg',
        title: 'Rueben Sandwich',
        timeAvailable: '30 minutes',
        description: 'Deli style Rueban Sandwich. Quick and easy to make and is delicious.',
        mealType: 'lunch',
        allergies: ['nut-free','no-allergy'],
        link: 'https://www.allrecipes.com/recipe/47717/reuben-sandwich-ii/',
    },
    {
        // Buttered noodles
        image: 'https://www.allrecipes.com/thmb/_-fntqlbxLl8Nx3Ll5apxQFGF9Q=/0x512/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/244458-buttered-noodles-DDMFS-4x3-b9931662efa64b37883c0f73b296b124.jpg',
        title: 'Buttered Noodles',
        timeAvailable: '30 minutes',
        description: 'Buttered noodles are simple to make with your favorite pasta, butter, Parmesan cheese, salt, and pepper for a quick and easy, kid-friendly dish.',
        mealType: 'lunch',
        allergies: ['nut-free','no-allergy'],
        link: 'https://www.allrecipes.com/recipe/244458/buttered-noodles/',
    },
    {
        // Taco Salad
        image: 'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F43%2F2023%2F01%2F30%2F14253-Taco-Salad-ddmfs-016-4x3-1.jpg&q=60&c=sc&poi=auto&orient=true&h=512',
        title: 'Taco Salad',
        timeAvailable: '30 minutes',
        description: 'This taco salad is a tasty twist on the conventional taco salad.',
        mealType: 'lunch',
        allergies: ['nut-free','no-allergy'],
        link: 'https://www.allrecipes.com/recipe/14253/taco-salad-i/',
    },
    {
        // Spicy Chicken Noodles
        image: 'https://www.allrecipes.com/thmb/zW1VNXMeAvkJ1q4Ae230iPjnu2w=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/4546075-spicy-chicken-noodles-Chef-John-1x1-1-f1d73f027f804fe8aa8c87248c93a3ba.jpg',
        title: 'Spicy Chicken Noodles',
        timeAvailable: '30 minutes',
        description: 'This spicy chicken noodle recipe is resturant quality. You can change up the recipe by adding any veggies you want!',
        mealType: 'lunch',
        allergies: ['gluten-free','no-allergy'],
        link: 'https://www.allrecipes.com/recipe/259480/spicy-chicken-noodles/',
    },
    {
        // Roasted Butternut Squash with Onions, Spinach, and Cranberries (vegan) (contains nuts)
        image: 'https://www.allrecipes.com/thmb/wfR2tZd3kuX7HFhtUpeV7T4gje8=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/1426915-5e37177a2d2e4134a4e4cc796d0b6beb.jpg',
        title: 'Roasted Butternut Squash with Onions, Spinach, and Cranberries',
        timeAvailable: '1 hour',
        description: 'A delicious squash salad, this recipe has kind of a nutty flavor with or without the nuts.',
        mealType: 'lunch',
        allergies: ['vegan','no-allergy'], 
        link: 'https://www.allrecipes.com/recipe/235814/roasted-butternut-squash-with-onions-spinach-and-craisins/',
    },
    {
        // Spicy Lentils with Sausage
        image: 'https://www.blessthismessplease.com/wp-content/uploads/2020/01/Lentils-with-Sausage-12.jpg',
        title: 'Spicy Lentils with Sausage',
        timeAvailable: '1 hour',
        description: 'This Spicy Lentils with Sausage dish is not your average lentil recipe—it’s flavorful, hearty, and so simple to make that you’ll love it for an easy weeknight meal!.',
        mealType: 'lunch',
        allergies: ['gluten-free','no-allergy'],
        link: 'https://www.blessthismessplease.com/spicy-lentils-with-sausage/',
    },
    {
        // Perfect Oven Fries 
        image: 'https://www.blessthismessplease.com/wp-content/uploads/2019/03/oven-fries-recipe-3.jpg',
        title: 'Perfect Oven Fries',
        timeAvailable: '1 hour',
        description: 'Who doesn’t love great homemade french fries? These Oven French Fries have all the crunch and flavor of your favorite fast food fries with out the need for a deep fryer!.',
        mealType: 'lunch',
        allergies: ['gluten-free','vegan','nut-free','no-allergy'],
        link: 'https://www.blessthismessplease.com/perfect-oven-fries/',
    },
    {
        // Veggie Burger
        image: 'https://www.allrecipes.com/thmb/hRjS9etubPNKQ-_zgcdfPa2ZGQg=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/954271-27eef96fac854e30b45f73a624bd4b6e.jpg',
        title: 'Spicy Black Bean and Corn Burgers',
        timeAvailable: '1 hour',
        description: 'A veggie burger full of flavor and a bit of spice!',
        mealType: 'lunch',
        allergies: ['vegan','no-allergy'],
        link: 'https://www.allrecipes.com/recipe/222249/spicy-black-bean-and-corn-burgers/',
    },
    {
        // Chicken Dum Beryani
        image: 'https://tildaricelive.s3.eu-central-1.amazonaws.com/wp-content/uploads/2021/03/29085727/Chicken-Dum-Biryani.webp',
        title: 'Chicken Dum Beryani',
        timeAvailable: '1 and a half hours',
        description: 'An indian culinary classic which is a delicious slow cooked, layered rice dish.',
        mealType: 'lunch',
        allergies: ['nut-free','no-allergy'],
        link: 'https://www.tilda.com/recipes/chicken-biryani-pastry/?_gl=1*yur1ps*_up*MQ..*_ga*NDY2MDM5MTAzLjE3MjMxNjU4MjQ.*_ga_G9ZR3RN795*MTcyMzE2NTgyMy4xLjAuMTcyMzE2NTgyMy4wLjAuMzg3MjEwNDk3',
    },
    {
        // Chicken noodle soup
        image: 'https://www.allrecipes.com/thmb/feYQt06KomD53Fxjs9j7b56fASI=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/Homemade-Roasted-Chicken-Noodle-Soup-2000-e2052c2143164bdea9638d2fe0858caa.jpg',
        title: 'Chicken Noodle Soup',
        timeAvailable: '1 and a half hours',
        description: 'Roasted chicken and homemade stock join tender veggies and egg noodles in this homemade chicken noodle soup that’s literally food for the soul!',
        mealType: 'lunch',
        allergies: ['nut-free', 'gluten-free','no-allergy'],
        link: 'https://www.allrecipes.com/recipe/8311358/homemade-roasted-chicken-noodle-soup/',
    }, 
    {
        // Stuffed Peppers
        image: 'https://hips.hearstapps.com/hmg-prod/images/stuffed-peppers-lead-649c91e2c4e39.jpg?resize=980:*',
        title: 'Stuffed Peppers',
        timeAvailable: '1 and a half hours',
        description: 'Strong enough to hold their shape, bell peppers are large enough to hold a decent amount of filling while taking to a variety of flavors—they’re the perfect vessel for countless combinations and ingredients. This versatile meal is not only simple to make, but feeds families big and small, making it a cheap & easy weeknight dinner legend.',
        mealType: 'lunch',
        allergies: ['nut-free', 'gluten-free','no-allergy'],
        link: 'https://www.delish.com/cooking/recipe-ideas/a23014857/classic-stuffed-peppers-recipe/',
    },
    {
        // Fettuccine Alfredo
        image: 'https://www.allrecipes.com/thmb/FtJIFNtbSNjxQPfYC4VGWmHURkg=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/668685_original-2000-c8f331a6e4c74794b0d5b7178abbba7b.jpg',
        title: 'Fettuccine Alfredo',
        timeAvailable: '30 minutes',
        description: 'This rich and creamy fettuccine Alfredo recipe is easy enough for beginner cooks, but it’s impressive enough for company.',
        mealType: 'dinner',
        allergies: ['nut-free','no-allergy'],
        link: 'https://www.allrecipes.com/recipe/23431/to-die-for-fettuccine-alfredo/',
    },
    {
        // Cheeseburger Pasta
        image: 'https://www.tamingtwins.com/wp-content/uploads/2023/09/image-3.jpeg',
        title: 'Cheeseburger Pasta',
        timeAvailable: '30 minutes',
        description: 'Easy one pot meal, this cheesburger pasta recipe is low cost and high flavor!',
        mealType: 'dinner',
        allergies: ['nut-free','no-allergy'],
        link: 'https://www.tamingtwins.com/cheeseburger-pasta/',
    },
    {
        // Roasted Butternut Squash Soup
        image: 'https://www.blessthismessplease.com/wp-content/uploads/2023/11/butternut-squash-soup-recipe-10-of-16.jpg',
        title: 'Roasted Butternut Squash Soup',
        timeAvailable: '1 hour',
        description: 'Butternut Squash Soup is creamy, full of flavor, and satisfying! This four-ingredient soup can be made warm and ready to eat in just under an hour.',
        mealType: 'dinner',
        allergies: ['gluten-free','vegan','nut-free','no-allergy'],
        link: 'https://www.blessthismessplease.com/roasted-butternut-squash-soup/',
    },

    {   // pizza dough
        image: 'https://www.allrecipes.com/thmb/fu-ChBPkr18Y55dcBf7LTaVK9oI=/0x512/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/20171-quick-and-easy-pizza-crust-VilmaNg-4x3-f3d3bfe73e3a47b6b65a7da6de3f213d.jpg',
        title: 'Pizza dough',
        timeAvailable: '1 hour',
        description: 'Homemade pizza dough that you can put all your favorite pizza toppings on.',
        mealType: 'dinner',
        allergies: ['no-allergy'],
        link: ['https://www.allrecipes.com/recipe/20171/quick-and-easy-pizza-crust/']
    },
    {
        // Ninety-Minute Sunday Dinner
        image: 'https://instantpot.com/cdn/shop/articles/NinetyMinuteSundayDinner-1.png?v=1707937693&width=800',
        title: 'Sunday Dinner',
        timeAvailable: '1 and a half hours',
        description: 'Easy instapot meal that tastes like it came from a gourmet resturant!',
        mealType: 'dinner',
        allergies: ['nut-free','no-allergy'],
        link: 'https://instantpot.com/blogs/recipes/ninety-minute-sunday-dinner',
    },
    {
        // Shrimp tacos
        image: 'https://www.allrecipes.com/thmb/mYAMolvCiM0beW3jpGeqmQNAMgU=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/280916-shrimp-tacos-with-cilantro-lime-crema-4x3-0389-1b3aec87d6e54bd0b1f06b0e36478124.jpg',
        title: 'Shrimp tacos',
        timeAvailable: '1 and a half hours',
        description: 'These sensational shrimp tacos with spicy seasoned shrimp, zesty lime crema, avocado, and cilantro are easy to make and so delicious.',
        mealType: 'dinner',
        allergies: ['nut-free','gluten-free','no-allergy'],
        link: 'https://www.allrecipes.com/recipe/280916/shrimp-tacos-with-cilantro-lime-crema/',
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
                                <p class="title is-4" style="align-items: flex-start">
                                    <a href="${recipe.link}">${recipe.title}</a>
                                </p>
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
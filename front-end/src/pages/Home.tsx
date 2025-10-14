import React from 'react';
import RecipeCard from '../components/RecipeCard';

const Home: React.FC = () => {
    const recipes = [
        {
            title: 'Spaghetti Carbonara',
            ingredients: ['Spaghetti', 'Eggs', 'Parmesan cheese', 'Pancetta', 'Black pepper'],
            instructions: 'Cook spaghetti. In a bowl, mix eggs and cheese. Fry pancetta. Combine all with pepper.'
        },
        {
            title: 'Chicken Curry',
            ingredients: ['Chicken', 'Curry powder', 'Coconut milk', 'Onion', 'Garlic'],
            instructions: 'Sauté onion and garlic. Add chicken and curry powder. Pour in coconut milk and simmer.'
        }
    ];

    return (
        <div>
            <h1>Recipe Website</h1>
            <div className="recipe-list">
                {recipes.map((recipe, index) => (
                    <RecipeCard 
                        key={index} 
                        title={recipe.title} 
                        ingredients={recipe.ingredients} 
                        instructions={recipe.instructions} 
                    />
                ))}
            </div>
        </div>
    );
};

export default Home;
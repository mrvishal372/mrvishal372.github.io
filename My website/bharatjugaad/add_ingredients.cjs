const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const additionalIngredients = `
            { id: 'mushroom', name: 'Mushroom', hindi: 'मशरूम', emoji: '🍄', category: 'veggies' },
            { id: 'sweet_potato', name: 'Sweet Potato', hindi: 'शकरकंद', emoji: '🍠', category: 'veggies' },
            { id: 'corn', name: 'Sweet Corn', hindi: 'मक्का', emoji: '🌽', category: 'veggies' },
            { id: 'tinda', name: 'Apple Gourd', hindi: 'टिंडा', emoji: '🥒', category: 'veggies' },
            { id: 'parwal', name: 'Pointed Gourd', hindi: 'परवल', emoji: '🥒', category: 'veggies' },
            { id: 'arbi', name: 'Colocasia', hindi: 'अरबी', emoji: '🥔', category: 'veggies' },
            { id: 'jimikand', name: 'Elephant Foot Yam', hindi: 'जिमीकंद', emoji: '🥔', category: 'veggies' },
            { id: 'raw_banana', name: 'Raw Banana', hindi: 'कच्चा केला', emoji: '🍌', category: 'veggies' },
            { id: 'jackfruit', name: 'Jackfruit', hindi: 'कटहल', emoji: '🍈', category: 'veggies' },
            { id: 'drumstick', name: 'Drumstick', hindi: 'सहजन', emoji: '🌿', category: 'veggies' },
            { id: 'amarnath_leaves', name: 'Amaranth Leaves', hindi: 'चौलाई', emoji: '🌿', category: 'veggies' },
            { id: 'mustard_leaves', name: 'Mustard Leaves', hindi: 'सरसों पत्ता', emoji: '🌿', category: 'veggies' },
            { id: 'spring_onion', name: 'Spring Onion', hindi: 'हरा प्याज', emoji: '🧅', category: 'veggies' },
            { id: 'broccoli', name: 'Broccoli', hindi: 'ब्रोकोली', emoji: '🥦', category: 'veggies' },
            { id: 'zucchini', name: 'Zucchini', hindi: 'तोरी', emoji: '🥒', category: 'veggies' },
            { id: 'celery', name: 'Celery', hindi: 'अजवाइन पत्ता', emoji: '🌿', category: 'veggies' },
            
            // 🍎 FRUITS (Extra)
            { id: 'apple', name: 'Apple', hindi: 'सेब', emoji: '🍎', category: 'fruits' },
            { id: 'banana', name: 'Banana', hindi: 'केला', emoji: '🍌', category: 'fruits' },
            { id: 'orange', name: 'Orange', hindi: 'संतरा', emoji: '🍊', category: 'fruits' },
            { id: 'grapes', name: 'Grapes', hindi: 'अंगूर', emoji: '🍇', category: 'fruits' },
            { id: 'mango', name: 'Mango', hindi: 'आम', emoji: '🥭', category: 'fruits' },
            { id: 'pomegranate', name: 'Pomegranate', hindi: 'अनार', emoji: '🍅', category: 'fruits' },
            { id: 'papaya', name: 'Papaya', hindi: 'पपीता', emoji: '🍈', category: 'fruits' },
            { id: 'watermelon', name: 'Watermelon', hindi: 'तरबूज', emoji: '🍉', category: 'fruits' },
            { id: 'guava', name: 'Guava', hindi: 'अमरूद', emoji: '🍐', category: 'fruits' },
            { id: 'pineapple', name: 'Pineapple', hindi: 'अनानास', emoji: '🍍', category: 'fruits' },
            { id: 'kiwi', name: 'Kiwi', hindi: 'कीवी', emoji: '🥝', category: 'fruits' },
            { id: 'strawberry', name: 'Strawberry', hindi: 'स्ट्रॉबेरी', emoji: '🍓', category: 'fruits' },
            
            // 🌾 GRAINS & FLOURS
            { id: 'wheat_flour', name: 'Wheat Flour', hindi: 'आटा', emoji: '🌾', category: 'grains' },
            { id: 'rice', name: 'Rice', hindi: 'चावल', emoji: '🍚', category: 'grains' },
            { id: 'basmati_rice', name: 'Basmati Rice', hindi: 'बासमती चावल', emoji: '🍚', category: 'grains' },
            { id: 'besan', name: 'Gram Flour', hindi: 'बेसन', emoji: '🥣', category: 'grains' },
            { id: 'maida', name: 'All Purpose Flour', hindi: 'मैदा', emoji: '🥣', category: 'grains' },
            { id: 'suji', name: 'Semolina', hindi: 'सूजी', emoji: '🥣', category: 'grains' },
            { id: 'ragi', name: 'Ragi', hindi: 'रागी', emoji: '🌾', category: 'grains' },
            { id: 'bajra', name: 'Pearl Millet', hindi: 'बाजरा', emoji: '🌾', category: 'grains' },
            { id: 'jowar', name: 'Sorghum', hindi: 'ज्वार', emoji: '🌾', category: 'grains' },
            { id: 'oats', name: 'Oats', hindi: 'ओट्स', emoji: '🥣', category: 'grains' },
            { id: 'poha', name: 'Flattened Rice', hindi: 'पोहा', emoji: '🥣', category: 'grains' },
            { id: 'sabudana', name: 'Tapioca Pearls', hindi: 'साबूदाना', emoji: '🥣', category: 'grains' },
            
            // 🥩 PROTEIN & DAIRY
            { id: 'paneer', name: 'Paneer', hindi: 'पनीर', emoji: '🧀', category: 'protein' },
            { id: 'tofu', name: 'Tofu', hindi: 'टोफू', emoji: '🧀', category: 'protein' },
            { id: 'milk', name: 'Milk', hindi: 'दूध', emoji: '🥛', category: 'protein' },
            { id: 'curd', name: 'Curd/Yogurt', hindi: 'दही', emoji: '🥣', category: 'protein' },
            { id: 'cheese', name: 'Cheese', hindi: 'चीज़', emoji: '🧀', category: 'protein' },
            { id: 'butter', name: 'Butter', hindi: 'मक्खन', emoji: '🧈', category: 'protein' },
            { id: 'ghee', name: 'Ghee', hindi: 'घी', emoji: '🍯', category: 'protein' },
            { id: 'eggs', name: 'Eggs', hindi: 'अंडे', emoji: '🥚', category: 'protein' },
            { id: 'chicken', name: 'Chicken', hindi: 'चिकन', emoji: '🍗', category: 'protein' },
            { id: 'mutton', name: 'Mutton', hindi: 'मटन', emoji: '🥩', category: 'protein' },
            { id: 'fish', name: 'Fish', hindi: 'मछली', emoji: '🐟', category: 'protein' },
            { id: 'prawns', name: 'Prawns', hindi: 'झींगा', emoji: '🦐', category: 'protein' },
            
            // 🥜 NUTS & SEEDS
            { id: 'almond', name: 'Almond', hindi: 'बादाम', emoji: '🥜', category: 'nuts' },
            { id: 'cashew', name: 'Cashew', hindi: 'काजू', emoji: '🥜', category: 'nuts' },
            { id: 'peanut', name: 'Peanut', hindi: 'मूंगफली', emoji: '🥜', category: 'nuts' },
            { id: 'walnut', name: 'Walnut', hindi: 'अखरोट', emoji: '🥜', category: 'nuts' },
            { id: 'raisin', name: 'Raisins', hindi: 'किशमिश', emoji: '🍇', category: 'nuts' },
            { id: 'pistachio', name: 'Pistachio', hindi: 'पिस्ता', emoji: '🥜', category: 'nuts' },
            { id: 'sesame', name: 'Sesame Seeds', hindi: 'तिल', emoji: '🧆', category: 'nuts' },
            { id: 'flax_seeds', name: 'Flax Seeds', hindi: 'अलसी', emoji: '🧆', category: 'nuts' },
            { id: 'chia_seeds', name: 'Chia Seeds', hindi: 'चिया बीज', emoji: '🧆', category: 'nuts' },
            { id: 'coconut', name: 'Coconut', hindi: 'नारियल', emoji: '🥥', category: 'nuts' },
            
            // 🍶 SPICES & CONDIMENTS
            { id: 'salt', name: 'Salt', hindi: 'नमक', emoji: '🧂', category: 'spices' },
            { id: 'turmeric', name: 'Turmeric', hindi: 'हल्दी', emoji: '🫙', category: 'spices' },
            { id: 'red_chilli_powder', name: 'Red Chilli Powder', hindi: 'लाल मिर्च पाउडर', emoji: '🌶️', category: 'spices' },
            { id: 'coriander_powder', name: 'Coriander Powder', hindi: 'धनिया पाउडर', emoji: '🫙', category: 'spices' },
            { id: 'cumin_seeds', name: 'Cumin Seeds', hindi: 'जीरा', emoji: '🫙', category: 'spices' },
            { id: 'mustard_seeds', name: 'Mustard Seeds', hindi: 'राई', emoji: '🫙', category: 'spices' },
            { id: 'garam_masala', name: 'Garam Masala', hindi: 'गरम मसाला', emoji: '🫙', category: 'spices' },
            { id: 'black_pepper', name: 'Black Pepper', hindi: 'काली मिर्च', emoji: '🫙', category: 'spices' },
            { id: 'cardamom', name: 'Cardamom', hindi: 'इलायची', emoji: '🫙', category: 'spices' },
            { id: 'cloves', name: 'Cloves', hindi: 'लौंग', emoji: '🫙', category: 'spices' },
            { id: 'cinnamon', name: 'Cinnamon', hindi: 'दालचीनी', emoji: '🪵', category: 'spices' },
            { id: 'bay_leaf', name: 'Bay Leaf', hindi: 'तेजपत्ता', emoji: '🍃', category: 'spices' },
            { id: 'asafoetida', name: 'Hing (Asafoetida)', hindi: 'हींग', emoji: '🫙', category: 'spices' },
            { id: 'kasuri_methi', name: 'Dry Fenugreek', hindi: 'कसूरी मेथी', emoji: '🌿', category: 'spices' },
            { id: 'chaat_masala', name: 'Chaat Masala', hindi: 'चाट मसाला', emoji: '🫙', category: 'spices' },
            { id: 'amchur', name: 'Mango Powder', hindi: 'अमचूर', emoji: '🫙', category: 'spices' },
            
            // 🛢️ OILS & SAUCES
            { id: 'mustard_oil', name: 'Mustard Oil', hindi: 'सरसों का तेल', emoji: '🛢️', category: 'oil' },
            { id: 'sunflower_oil', name: 'Sunflower Oil', hindi: 'सूरजमुखी का तेल', emoji: '🛢️', category: 'oil' },
            { id: 'olive_oil', name: 'Olive Oil', hindi: 'जैतून का तेल', emoji: '🫒', category: 'oil' },
            { id: 'coconut_oil', name: 'Coconut Oil', hindi: 'नारियल का तेल', emoji: '🥥', category: 'oil' },
            { id: 'soy_sauce', name: 'Soy Sauce', hindi: 'सोया सॉस', emoji: '🍶', category: 'oil' },
            { id: 'chilli_sauce', name: 'Chilli Sauce', hindi: 'चिली सॉस', emoji: '🌶️', category: 'oil' },
            { id: 'tomato_ketchup', name: 'Tomato Ketchup', hindi: 'टमाटर केचप', emoji: '🍅', category: 'oil' },
            { id: 'vinegar', name: 'Vinegar', hindi: 'सिरका', emoji: '🍶', category: 'oil' },
            { id: 'ginger_garlic_paste', name: 'Ginger Garlic Paste', hindi: 'अदरक लहसुन पेस्ट', emoji: '🧄', category: 'oil' },
`;

html = html.replace('const KITCHEN_INGREDIENTS = [', 'const KITCHEN_INGREDIENTS = [\n' + additionalIngredients);
fs.writeFileSync('index.html', html);
console.log('Added more ingredients');

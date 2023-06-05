import { createRouter, createWebHashHistory } from "vue-router";
import RestaurantDetails from './view/RestaurantDetails.vue'
import Restaurants from './view/Restaurants.vue'

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            name: 'RestaurantsView',
            component: Restaurants
          },
          {
            path: '/restaurant/:id',
            name: 'RestaurantDetail',
            component: RestaurantDetails,
            props: true,
          }

    ]
});

export default router;
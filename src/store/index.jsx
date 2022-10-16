import { configureStore } from '@reduxjs/toolkit'
import carSidebarSlice from './slices/carSidebar.slice'
import isLoadingSlice from './slices/isLoading.slice'
import NewProductScile from './slices/NewProduct.scile'
import purchasesSlice  from './slices/purchases.slice'

export default configureStore({
    reducer: {
      isLoading: isLoadingSlice,
      product: NewProductScile,
      purchases: purchasesSlice,
      sidebar: carSidebarSlice
    }
})

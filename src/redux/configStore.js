import { applyMiddleware, combineReducers, createStore } from 'redux'
import thunk from 'redux-thunk';
import { CarouselReducer } from './reducers/CarouselReducer';
import { ModalReducer } from './reducers/ModalReducer';
import { LogReducer } from './reducers/LogReducer';
import { RegisterReducer } from './reducers/RegisterReducer';
import { QuanLyDatVeReducer } from './reducers/QuanLyDatVeReducer';
import { QuanLyPhimReducer } from './reducers/QuanLyPhimReducer'
import { QuanLyRapReducer } from './reducers/QuanLyRapReducer'
import { QuanLyNguoiDungReducer } from './reducers/QuanLyNguoiDungReducer';
import { LoadingReducer } from './reducers/LoadingReducer';


const rootReducer = combineReducers({
    CarouselReducer,
    ModalReducer,
    LogReducer,
    RegisterReducer,
    QuanLyPhimReducer,
    QuanLyRapReducer,
    QuanLyDatVeReducer,
    QuanLyNguoiDungReducer,
    LoadingReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunk))


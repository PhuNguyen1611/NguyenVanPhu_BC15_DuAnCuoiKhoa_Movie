




const stateDefault = {
    arrImgCarousel: [],

}

export const CarouselReducer = (state = stateDefault, action) => {

    switch (action.type) {
        case 'GET_CAROUSEL': {
            state.arrImgCarousel = action.arrImgCarousel;
            return { ...state }
        }
        default: return { ...state }
    }
}
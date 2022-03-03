import { quanLyPhimServices } from "../../services/QuanLyPhimServices"
import { GET_CAROUSEL } from "../types/CarouselType"

export const getCarouselAction = () => {
    return async (dispatch) => {
        try {
            const result = await quanLyPhimServices.layDanhSachBanner()
            console.log('result', result)
            dispatch({
                type: GET_CAROUSEL,
                arrImgCarousel: result.data.content
            })
        } catch (errors) {
            console.log('error', errors)
        }
    }
}
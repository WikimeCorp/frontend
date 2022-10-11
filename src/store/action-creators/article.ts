import { Dispatch } from "@reduxjs/toolkit"
import axios from "axios"
import { ArticleAction, ArticleActionTypes } from "../../types/article"

export const fetchArticles = () => async (dispatch: Dispatch<ArticleAction>) => {
        try {
            dispatch({type: ArticleActionTypes.FETCH_ARTICLES})
            const response = await axios.get('https://jsonplaceholder.typicode.com/photos?_limit=10')
            dispatch({type: ArticleActionTypes.FETCH_ARTICLES_SUCCESS, payload: response.data})
        } catch (e) {
            dispatch({
                type: ArticleActionTypes.FETCH_ARTICLES_ERROR, 
                payload: 'Произошла ошибка при загрузке статей'
            })
        }
}

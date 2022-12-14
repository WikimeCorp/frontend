import { FC } from 'react';
import TextForm from '../components/Forms/addArticle/TextForm';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { useAddAnimeMutation, useUpdateAnimeMutation } from '../store/API/anime';
import { setAddAnime, setAnimeId } from '../store/reducers/AddAnimeSlice';
import '../styles/Add.css';
import { IAnime } from '../types/IAnime';

const Add: FC = () => {
    const { id, update } = useAppSelector((state) => state.addAnimeReducer);
    const [addArticle] = useAddAnimeMutation();
    const [updateArticle] = useUpdateAnimeMutation();
    const dispatch = useAppDispatch();

    const onSubmit = async (formFields: Partial<IAnime>) => {
        if (formFields) {
            dispatch(setAddAnime(formFields));

            if (update && id !== undefined) {
                try {
                    await updateArticle({ id, ...formFields });
                } catch (error) {
                    throw error;
                }
            } else {
                try {
                    const payload = await addArticle(formFields).unwrap();
                    dispatch(setAnimeId(payload.animeId));
                } catch (error) {
                    throw error;
                }
            }
        }
    };

    return (
        <div className="Add-page">
            <TextForm onSubmit={onSubmit} />
        </div>
    );
};

export default Add;

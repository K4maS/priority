import '../styles/styles.scss';
import { titles } from './data';
import { dropDownClick } from './actions';
import { mountDirections } from './render';
import { renderAchievementsList } from './render';

mountDirections(titles);
renderAchievementsList();
dropDownClick();
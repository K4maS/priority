import '../styles/styles.scss';
import $ from 'jquery';
import { titles, articles } from './data';
import { activeteDorpdown } from './actions';
import { mountDirections } from './render';
import { renderAchievementsList } from './render';

mountDirections(titles);
renderAchievementsList();

$('.dropdown-btn').on('click', activeteDorpdown);

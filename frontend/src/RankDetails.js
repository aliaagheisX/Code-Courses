
export const ranks = ['Newbie', 'Pupil', 'Specialist', 'Expert', 'CM', 'IM', 'GM', 'IGM', 'LGM'];
export const min_scores_per_rank = [0, 1200, 1400, 1600, 1900, 2100, 2300, 2400, 2600, 3000]

export const bg_styles = [
    'linear-gradient(90deg, #2C3E50 34.9%, #BDC3C7 98.96%)',
    'linear-gradient(90deg, #11998E 63.54%, #38EF7D 98.96%)',
    'linear-gradient(90deg, #514A9D 52.6%, #24C6DC 98.96%)',
    'linear-gradient(90deg, #1A2980 46.88%, #26D0CE 100%)',
    'linear-gradient(90deg, #493240 50.6%, #FF0099 98.96%)',
    'linear-gradient(90deg, #799F0C 0%, #00416A 100%)',
    'linear-gradient(90deg, #F5AF19 63.54%, #F12711 98.96%)',
    'linear-gradient(90deg, #C31432 63.54%, #240B36 100%)',
    'linear-gradient(90deg, #3C1053 63.54%, #AD5389 98.96%)',
    'linear-gradient(90deg, #200122 63.54%, #6F0000 98.96%)'
]

const getRatingByScore = (score) => {
    for (let i = 0; i < min_scores_per_rank.length; i++) {
        if (min_scores_per_rank[i] > score) {
            return i - 1;
        }
    }
    return 8;//max rating
}
const getPercentileOfNxtRating = (score) => {

    const currRank = getRatingByScore(score);
    let nxtRankScore = 0;
    let befRankScore = 0;
    if (score >= 3000) {
        nxtRankScore = (Math.floor(score / 1000) + 1) * 1000;
        befRankScore = nxtRankScore - 1000;
    }
    else {
        nxtRankScore = min_scores_per_rank[currRank + 1];
        befRankScore = min_scores_per_rank[currRank];
    }

    return [(nxtRankScore - score), ((score - befRankScore) / (nxtRankScore - befRankScore) * 100)];


}

const RankDetails = (score) => {
    const rank_ind = getRatingByScore(score);
    const rank = ranks[rank_ind];
    const rem = getPercentileOfNxtRating(score)[0];
    const percent = getPercentileOfNxtRating(score)[1];
    const nxtRank = rank_ind === 8 ? 'Thousands' : ranks[rank_ind + 1];
    const background = bg_styles[rank_ind]

    return {
        rank_ind,
        rank,
        rem,
        percent,
        nxtRank,
        background
    }
}
export default RankDetails;
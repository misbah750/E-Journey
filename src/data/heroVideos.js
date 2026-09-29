/**
 * Hero video montage — famous places, in play order.
 * Clips are free-to-use Pexels videos (Pexels License), streamed from the Pexels CDN.
 * `hd` (1280×720) plays on larger screens, `sd` (960×540) on smaller ones; phones and
 * data-saver connections get a still-image slideshow of the `poster` frames instead.
 * `start` / `length` pick the most cinematic seconds of each clip.
 *
 * To self-host: put optimised MP4s in /public/video/ and point hd/sd at them.
 */
const video = (id, file) => `https://videos.pexels.com/video-files/${id}/${file}`;
const poster = (id, file) => `https://images.pexels.com/videos/${id}/${file}?auto=compress&cs=tinysrgb&w=1600`;

export const heroClips = [
  {
    key: 'hunza',
    place: 'Attabad Lake, Hunza',
    country: 'Pakistan',
    hd: video(27903903, '12258488_1280_720_25fps.mp4'),
    sd: video(27903903, '12258487_960_540_25fps.mp4'),
    poster: poster(27903903, 'aerial-asia-background-bay-27903903.jpeg'),
    start: 0,
    length: 6.6,
    credit: 'hilook production',
  },
  {
    key: 'makkah',
    place: 'Masjid al-Haram, Makkah',
    country: 'Saudi Arabia',
    hd: video(35098661, '14869342_1280_720_60fps.mp4'),
    sd: video(35098661, '14869341_960_540_60fps.mp4'),
    poster: poster(35098661, '4k-asia-islam-kaaba-35098661.jpeg'),
    start: 1,
    length: 7,
    credit: 'Earth Photart',
  },
  {
    key: 'dubai',
    place: 'Downtown Dubai',
    country: 'United Arab Emirates',
    hd: video(34529252, '14629587_1280_720_60fps.mp4'),
    sd: video(34529252, '14629586_960_540_60fps.mp4'),
    poster: poster(34529252, 'burj-khalifa-dubai-dubai-fountain-dubai-mall-34529252.jpeg'),
    start: 1,
    length: 7,
    credit: 'Mohammed Resan',
  },
  {
    key: 'cappadocia',
    place: 'Cappadocia',
    country: 'Türkiye',
    hd: video(32523858, '13869572_1280_720_60fps.mp4'),
    sd: video(32523858, '13869571_960_540_60fps.mp4'),
    poster: poster(32523858, 'pexels-photo-32523858.jpeg'),
    start: 0.5,
    length: 7,
    credit: 'Ahmed',
  },
  {
    key: 'madinah',
    place: 'Masjid an-Nabawi, Madinah',
    country: 'Saudi Arabia',
    hd: video(31281542, '13358267_1280_720_60fps.mp4'),
    sd: video(31281542, '13358266_960_540_60fps.mp4'),
    poster: poster(31281542, 'a-beautiful-view-al-masjid-an-nabawi-allah-hajj-31281542.jpeg'),
    start: 3,
    length: 7,
    credit: 'Yusuf Khan Afridi',
  },
  {
    key: 'lahore',
    place: 'Badshahi Mosque, Lahore',
    country: 'Pakistan',
    hd: video(4417581, '4417581-hd_1280_720_30fps.mp4'),
    sd: video(4417581, '4417581-sd_960_540_30fps.mp4'),
    poster: poster(4417581, 'pexels-photo-4417581.jpeg'),
    start: 2,
    length: 7,
    credit: 'Ayesha Khan',
  },
  {
    key: 'maldives',
    place: 'The Maldives',
    country: 'Indian Ocean',
    hd: video(35215090, '14918236_1280_720_30fps.mp4'),
    sd: video(35215090, '14918235_960_540_30fps.mp4'),
    poster: poster(35215090, 'maldives-35215090.jpeg'),
    start: 1,
    length: 7,
    credit: 'Hussain Naushad',
  },
];

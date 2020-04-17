export const reverseGeocode = async (lat, lon) => {
  try {
    let results = await fetch(
      `https://us1.locationiq.com/v1/reverse.php?key=75232b95ff1a41&lat=${lat}&lon=${lon}&format=json`
    );
    return results.json();
  } catch (err) {
    console.log('Something went wrong!');
  }
};

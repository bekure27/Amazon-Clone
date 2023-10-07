const generateID = () => {
  const randomId = Math.floor(Math.random() * 100_000_000); 
  return `${randomId}`;
};

export default generateID

// console.log(generateID())
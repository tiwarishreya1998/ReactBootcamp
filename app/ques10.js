
const unique = (value, index, self) => {
    return self.indexOf(value) === index
  }
  
  const names = ["ram", "rohan", "riya", "priya", "ram", "riya", "vidya", "priya", "ved"]
  const uniqueName = names.filter(unique)
  
  export{
      uniqueName
  };
const FoodList = ({ entries }) => {
  return (
    <ul>
      {entries.map(({ id, title, calories }) => (
        <li key={id}>
          {title} — {calories} ккал
        </li>
      ))}
    </ul>
  );
};

export default FoodList;

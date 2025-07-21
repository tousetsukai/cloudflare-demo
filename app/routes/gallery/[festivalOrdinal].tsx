import { createRoute } from 'honox/factory';
import { Ordinal } from '../../../domain/values/ordinal';

export default createRoute(async (c) => {
  const { festivalOrdinal } = c.req.param();
  let festivalNumber: number;
  try {
    festivalNumber = Ordinal.parse(festivalOrdinal).inner;
  } catch (_error) {
    return c.render(
      <div class="py-8 text-center">
        <h1 class="text-3xl font-bold">Invalid Festival Number</h1>
        <p>Please provide a valid festival number in the format like "58th".</p>
        <a href="/" class="text-blue-500 hover:underline">
          Go back to Home
        </a>
      </div>,
    );
  }

  // Assuming you have a method to fetch festival details by number
  const festivalDetails =
    await festivalRepository.findFestivalByNumber(festivalNumber);

  return c.render(
    <div class="py-8 text-center">
      <h1 class="text-3xl font-bold">Festival Details</h1>
      {festivalDetails ? (
        <div>
          <p>Festival Number: {festivalDetails.number}</p>
          <p>Name: {festivalDetails.name}</p>
          <p>Date: {festivalDetails.date.toISOString()}</p>
          <p>Location: {festivalDetails.location}</p>
        </div>
      ) : (
        <p>Festival not found.</p>
      )}
      <a href="/" class="text-blue-500 hover:underline">
        Go back to Home
      </a>
    </div>,
  );
});

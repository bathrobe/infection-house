export default function Pagination({ itemsPerPage, paginate, totalItems }) {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <div>
      <ul className="text-gray-800 flex hover:underline">
        {pageNumbers.map((n) => {
          return (
            <li key={n} className="mx-2">
              <a
                href="#"
                onClick={() => {
                  paginate(n);
                }}
              >
                {n}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

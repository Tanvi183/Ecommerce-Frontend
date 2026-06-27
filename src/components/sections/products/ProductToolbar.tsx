"use client";

interface ProductToolbarProps {
  total: number;
}

export default function ProductToolbar({ total }: ProductToolbarProps) {
  return (
    <div className="bg-[#f8f8f8] border border-[#dddddd] p-3 flex flex-wrap items-center justify-between mb-6 gap-4">
      {/* View Toggles (List/Grid) */}
      <div className="flex items-center gap-2">
        <button className="w-8 h-8 flex items-center justify-center bg-[var(--primary)] text-white border border-[var(--primary-dark)]" title="Grid View">
          <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><path d="M4 4h4v4H4zm6 0h4v4h-4zm6 0h4v4h-4zM4 10h4v4H4zm6 0h4v4h-4zm6 0h4v4h-4zM4 16h4v4H4zm6 0h4v4h-4zm6 0h4v4h-4z"/></svg>
        </button>
        <button className="w-8 h-8 flex items-center justify-center bg-white text-[#666666] border border-[#dddddd] hover:text-[var(--primary)]" title="List View">
          <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z"/></svg>
        </button>
        <span className="text-[13px] text-[#696973] ml-2 hidden sm:inline-block">Product Compare (0)</span>
      </div>

      <div className="flex items-center gap-4 text-[13px]">
        {/* Sort By */}
        <div className="flex items-center gap-2">
          <label htmlFor="sort" className="text-[#333333] hidden sm:block">Sort By:</label>
          <select id="sort" className="border border-[#cccccc] bg-white text-[#696973] p-1.5 focus:outline-none focus:border-[var(--primary)]">
            <option>Default</option>
            <option>Name (A - Z)</option>
            <option>Name (Z - A)</option>
            <option>Price (Low &gt; High)</option>
            <option>Price (High &gt; Low)</option>
            <option>Rating (Highest)</option>
            <option>Rating (Lowest)</option>
          </select>
        </div>

        {/* Limit */}
        <div className="flex items-center gap-2">
          <label htmlFor="limit" className="text-[#333333] hidden sm:block">Show:</label>
          <select id="limit" className="border border-[#cccccc] bg-white text-[#696973] p-1.5 focus:outline-none focus:border-[var(--primary)]">
            <option>15</option>
            <option>25</option>
            <option>50</option>
            <option>75</option>
            <option>100</option>
          </select>
        </div>
      </div>
    </div>
  );
}

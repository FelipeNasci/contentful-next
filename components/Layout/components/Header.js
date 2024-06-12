import Link from "next/link";
import { memo } from "react";

function Header() {
  return (
    <header>
      <Link href="/">
        <h1>
          <span>Just Add</span>
          <span>Marmite</span>
        </h1>
        <h2>Spread The Joy</h2>
      </Link>
    </header>
  );
}

export default memo(Header);

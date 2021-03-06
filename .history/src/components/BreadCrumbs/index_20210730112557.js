import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import "./style.scss";

const convertBreadcrumb = (string) => {
  return string
    .replace(/-/g, " ")
    .replace(/oe/g, "ö")
    .replace(/ae/g, "ä")
    .replace(/ue/g, "ü");
};

const Breadcrumbs = () => {
  const router = useRouter();
  const [breadcrumbs, setBreadcrumbs] = useState(null);

  useEffect(() => {
    if (router) {
      const linkPath = router.asPath.split("/");
      linkPath.shift();

      const pathArray = linkPath.map((path, i) => {
        return {
          breadcrumb: path,
          href: "/" + linkPath.slice(0, i + 1).join("/"),
        };
      });

      setBreadcrumbs(pathArray);
    }
  }, [router]);

  if (!breadcrumbs) {
    return null;
  }

  return (
    <nav aria-label="breadcrumbs">
      <ol className="breadcrumb mt-6">
        <div className="px-2">
          <li>
            <Link href="/">
              <a>Home</a>
            </Link>
          </li>
          {breadcrumbs.map((breadcrumb, i) => {
            return (
              <li key={breadcrumb.href} key={`breadcrumbs_${i}`}>
                <Link href={breadcrumb.href}>
                  <a className="capitalize">
                    {convertBreadcrumb(breadcrumb.breadcrumb)}
                  </a>
                </Link>
              </li>
            );
          })}
        </div>
      </ol>
    </nav>
  );
};

export default Breadcrumbs;

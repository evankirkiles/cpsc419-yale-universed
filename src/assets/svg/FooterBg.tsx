/*
 * DAY.tsx
 * Author: evan kirkiles
 * Created On Sun Aug 27 2023
 * 2023 Design at Yale
 *
 * Use this file as an example for how to best use SVG's throughout your app.
 * Copy paste the contents of an SVG into JSX and prop spread through any props
 * to the top-level <svg /> element:
 *  1. Remove the width and height HTML attributes from the <svg />
 *  2. Prop spread down into the SVG
 *  3. Add a <title> to the SVG for accessibility
 *  4. (optionally) Replace fills and strokes with currentColor for adaptive coloring.
 * You should now have a great SVG to use across your app.
 */

import { SVGProps } from "react";

export default function FooterBg({
  disableTitle,
  ...props
}: SVGProps<SVGSVGElement> & { disableTitle?: boolean }) {
  return (
    <svg
      viewBox="0 0 1512 369"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      {...props}
    >
      {!disableTitle && <title>A skyline vector image</title>}
      <g clip-path="url(#clip0_19_210)">
        <path
          d="M260.5 0C-27.1 0 -172.333 174.667 -209 262V890.5H1711.5C1721.67 634.333 1681.1 122 1437.5 122C1133 122 1193.5 366 852 360C510.5 354 620 0 260.5 0Z"
          data-bg="true"
          vector-effect="non-scaling-stroke"
        />
        <path
          d="M32.5 352V107.5H169.5V229.75M169.5 352V229.75M169.5 229.75H265.5V352V154.5H392V289M392 352V289M392 289H507V83H669V368.5"
          stroke="currentColor"
          stroke-width="5"
          vector-effect="non-scaling-stroke"
        />
        <path
          d="M669 352V107.5H806V229.75M806 352V229.75M806 229.75H902V352V154.5H1028.5V289M1028.5 352V289M1028.5 289H1143.5V83H1305.5V368.5"
          stroke="currentColor"
          stroke-width="5"
          vector-effect="non-scaling-stroke"
        />
        <path
          d="M-538 331.114V-8.01751H-415.313V161.548M-415.313 331.114V161.548M-415.313 161.548H-329.343V331.114V57.1734H-216.06V243.73M-216.06 331.114V243.73M-216.06 243.73H-113.075V-42H32V354"
          stroke="currentColor"
          stroke-width="5"
          vector-effect="non-scaling-stroke"
        />
      </g>
      <defs>
        <clipPath id="clip0_19_210">
          <rect width="1512" height="369" data-bg="true" />
        </clipPath>
      </defs>
    </svg>
  );
}

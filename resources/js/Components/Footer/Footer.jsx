import moment from 'moment'

export default function Footer() {
  return (
<footer className=" w-full rounded-t-lg flex flex-col items-center bg-white dark:bg-gray-800/80 text-center">
  <div className="w-full p-4 text-center dark:bg-gray-800/80">
    Copyright © {moment().year()} All rights reserved.
    <p className="text-lg font-bold">Ibrahim Jamal</p>

    <div className="flex justify-center px-2">
      <a
        href="https://github.com/ibrahimjml"
        className="text-gray-400 hover:text-gray-900 dark:hover:text-white"
      >
        <i className="fab fa-github"></i>
      </a>
    </div>
  </div>
</footer>

  )
}

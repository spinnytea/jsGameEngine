Dir.chdir(File.dirname(__FILE__))

use Rack::Static,
  :urls => ["/assets", "/js", "/resources"],
  :root => "."

run lambda { |env|
  [
    200,
    {
      'Content-Type'  => 'text/html',
      'Cache-Control' => 'public, max-age=86400'
    },
    File.open('game.html', File::RDONLY)
  ]
}
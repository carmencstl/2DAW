<?php
(float)$num = 2.1;

echo gettype($num);
echo "<br>";
settype($num, "string");
echo gettype($num);
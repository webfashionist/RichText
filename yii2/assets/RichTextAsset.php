<?php

namespace Webfashionist\RichText\yii2\assets;

use yii\web\AssetBundle;
use yii\web\YiiAsset;

class RichTextAsset extends AssetBundle
{
    public $sourcePath = '@vendor/webfashionist/richtext/src';
    public $js = ['jquery.richtext.min.js'];
    public $css = ['richtext.min.css'];

    public $depends = [
        YiiAsset::class,
        FontAweSomeAsset::class,
    ];
}

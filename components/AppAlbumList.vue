<template>
  <aside>
    <nav id="sidebar">
      <div id="sidebar-header" class="d-flex justify-content-between">
        <h3>Albums</h3>
        <button class="btn btn-primary">
          <i class="fa fa-plus" />
        </button>
      </div>
      <ul id="album-list" class="nav flex-column">
        <li class="nav-item">
          <a class="nav-link" href="#">Album 1</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Album 2</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Album 3</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Album 4</a>
        </li>
      </ul>
    </nav>
  </aside>
</template>

<style scoped>
#sidebar {
  min-width: 250px;
  max-width: 250px;
  height: 100%;
  transition: all 0.3s;
  padding: 10px;
  background: #f5f5f5;
  border-right: 1px solid #e0e0e0;
}

#sidebar-header {
  padding: 10px;
}

#sidebar-header .btn {
  width: 40px;
  height: 40px;
  border-radius: 20px;
  border: 0;
}

#album-list {
  border-bottom: 1px solid #e0e0e0;
  padding-bottom: 20px;
}

#album-list a,
a:hover,
a:focus {
  color: inherit;
  text-decoration: none;
  transition: all 0.3s;
}

#album-list a:hover {
  background: #e0e0e0;
}

@media (max-width: 768px) {
  #sidebar {
    margin-left: -75%;
    min-width: 75%;
    max-width: 75%;
    position: fixed;
    z-index: 1;
  }
  #sidebar.show {
    margin-left: 0;
  }
}
</style>
